import { Alert, Pressable, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '../../components/Input'
import KeyboardUsingContainer from '../../components/KeyboardUsingContainer'
import Header from '../../components/Header'
import { LinearGradient } from 'expo-linear-gradient'
import ChatView from '../../components/ChatView'
import { useLocalSearchParams } from 'expo-router'
import { supabase } from '../../lib/supabase'
import CustomButton from '../../components/CustomButton'

const chat = () => {
    const { id } = useLocalSearchParams()
    const [messages, setMessages] = useState([])
    const [loadingMessages, setLoadingMessages] = useState(true)
    const [aiTurnedOn, setAiTurnedOn] = useState(true)
    const [settingsOpen, setSettingsOpen] = useState(false)

    async function getMessages() {
        try {
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .eq('chat_id', id)
            if (error) {
                throw error
            }
            if (data) {
                setMessages(data)
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message)
            }
        } finally {
            setLoadingMessages(false)
        }
    }

    useEffect(() => {
        getMessages()
    }, [])

    async function sendMessage(content, from) {
        try {
            const { data, error } = await supabase
                .from('messages')
                .insert([{ content, chat_id: id, from: from }])
                .select()
            if (error) {
                throw error
            }
            if (data) {
                setMessages(prevMessages => {
                    const updatedMessages = [...prevMessages, data[0]];
                    if (from === 'User' && aiTurnedOn) {
                        queryOpenAI();
                    }
                    return updatedMessages;
                });
            }
            return data
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message)
            }
        }
    }

    async function queryOpenAI() {
        const prompt = 'Pretend you are an assistant that helps me brainstorm and generate ideas. This was the converstaion until now, you should answer based on that.'
        const messagesString = messages.map(msg => `${msg.from}: '${msg.content}'`).join(' ')
        try {
            console.log('querying openai')
            const { data, error } = await supabase.functions.invoke('openai', {
                body: { query: prompt + messagesString }
            })
            if (error) {
                throw error
            }
            if (data) {
                sendMessage(data, 'AI')
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message)
            }
        }
    }

    return (
        <SafeAreaView className="bg-primary h-full">
            <LinearGradient
                colors={['#0E0C1D', '#07060E']}
                className="absolute h-[100vh] left-0 right-0 top-0"
            />
            <KeyboardUsingContainer>
                <View className="h-full justify-between">
                    <Header title="Chat" rightIconFunction={() => setSettingsOpen(!settingsOpen)} />

                    {settingsOpen && (
                        <Pressable className="bg-[#50429E] p-5 rounded-lg w-[70%] absolute right-3 top-20 z-50 flex-row justify-between shadow-lg" onPress={() => setAiTurnedOn(!aiTurnedOn)}>
                            <Text className="text-white font-psemibold">AI </Text>
                            <Text className="text-white font-pregular">Turn {aiTurnedOn ? 'Off' : 'On'}</Text>
                        </Pressable>
                    )}

                    <ChatView messages={messages.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))} loading={loadingMessages} />
                    <Input placeholder="Write down your thoughts..." onSendMessage={sendMessage}/>
                </View>
            </KeyboardUsingContainer>
        </SafeAreaView>
    )
}

export default chat