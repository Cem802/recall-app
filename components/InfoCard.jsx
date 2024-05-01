import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import FontawesomeIcon from '@expo/vector-icons/FontAwesome'
import Ionicons from '@expo/vector-icons/Ionicons'
import { supabase } from '../lib/supabase'

const InfoCard = ({date, topic, total_msg, id}) => {
    const [generatingSummary, setGeneratingSummary] = useState(false)
    const [summary, setSummary] = useState('')
    const [loadingSummary, setLoadingSummary] = useState(true)

    async function fetchMessages() {
        try {
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .eq('chat_id', id)
            if (error) {
                throw error
            }
            if (data) {
                return data
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message)
            }
        }
    }

    async function generateAISummary() {
        setGeneratingSummary(true)
        const prompt = 'Summarize the most important things from the conversation. Dont say who did what. Pick the specific topics from the conversation. ".'
        const allMessages = await fetchMessages()
        const messagesString = allMessages.map(msg => msg.content).join(' ')
        try {
            const { data, error } = await supabase.functions.invoke('openai', {
                body: { query: prompt + messagesString}
            })
            if (error) {
                throw error
            }
            if (data) {
                setSummary(data)
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message)
            }
        } finally {
            setLoadingSummary(false)
        }
    }
    return (
        <View className="p-5">
            {!generatingSummary ? (
                <>
                <View className="bg-[#6152B7] rounded-xl">
                    <View className="flex-row justify-between items-center p-5">
                        <Text className="text-white font-pregular text-base">Date</Text>
                        <Text className="text-white font-pregular text-base">{date}</Text>
                    </View>
                    <View className="w-full h-[1px] bg-secondary" />
                    <View className="flex-row justify-between items-center p-5">
                        <Text className="text-white font-pregular text-base">Topic</Text>
                        <Text className="text-white font-pregular text-base">{topic}</Text>
                    </View>
                    <View className="w-full h-[1px] bg-secondary-100" />
                    <View className="flex-row justify-between items-center p-5">
                        <Text className="text-white font-pregular text-base">Total Messages</Text>
                        <Text className="text-white font-pregular text-base">{total_msg}</Text>
                    </View>
                </View>

                <TouchableOpacity className="bg-[#6152B7] rounded-xl mt-5" onPress={() => generateAISummary()}>
                    <View className="flex-row justify-between items-center p-5">
                        <Text className="text-white font-psemibold text-base">Generate Summary</Text>
                        <Text className="text-white font-pregular text-base"><FontawesomeIcon name="magic" size={25} color="white" /></Text>
                    </View>
                </TouchableOpacity>
                </>
                ) :  (
                    <View className="bg-[#6152B7] rounded-xl h-[280px]">
                        <View className="flex-row justify-between items-center p-5 pb-2">
                            <Ionicons name="arrow-back" size={25} color="white" onPress={() => setGeneratingSummary(false)} />
                            <Text className="text-white font-pregular text-base">Summary</Text>
                            <View className="w-6" />
                        </View>
                        <ScrollView className="overflow-hidden">
                            {loadingSummary ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <Text className="text-white font-pregular text-base p-5">{summary}</Text>
                            )}
                        </ScrollView>
                    </View>
                )}
        </View>
    )
}

export default InfoCard