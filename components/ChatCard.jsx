import { View, Text, TouchableOpacity, Pressable, Alert, } from 'react-native'
import React, { useEffect, useState } from 'react'
import Anticon from '@expo/vector-icons/AntDesign'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { useGlobalContext } from '../context/GlobalProvider'
import { supabase } from '../lib/supabase'
import { router } from 'expo-router'

const InfoCard = ({date, topic, total_msg}) => {
    return (
        <View className="p-5">
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

            <View className="bg-[#6152B7] rounded-xl mt-5">
                <View className="flex-row justify-between items-center p-5">
                    <Text className="text-red-600 font-psemibold text-base">Delete</Text>
                    <Text className="text-white font-pregular text-base"><Anticon name="delete" size={25} color="red" /></Text>
                </View>
            </View>
        </View>
    )
}

const ChatCard = ({item, refresh}) => {
    const { setBottomSheet } = useGlobalContext()
    const formatedDate = new Date(item.created_at).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
    const [totalMessages, setTotalMessages] = useState(0)
    const [lastMessage, setLastMessage] = useState('')

    const renderRightActions = () => {
        return (
            <View className="h-full w-48 flex-row justify-center items-center">
                <TouchableOpacity className="h-full justify-center items-center gap-1 w-24" onPress={() => setBottomSheet({header: "Chat Info", content: <InfoCard date={formatedDate} topic={item.topic} total_msg={totalMessages} />})}>
                    <Anticon
                        name='infocirlceo'
                        size={25}
                        color='blue'
                    />
                    <Text className="text-white font-pthin text-xs">Info</Text>
                </TouchableOpacity>
                <TouchableOpacity className="h-full justify-center items-center gap-1 w-24">
                    <Anticon
                        name='delete'
                        size={25}
                        color='red'
                        onPress={() => getMessageData()}
                    />
                    <Text className="text-white font-pthin text-xs">Delete</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const renderLeftActions = () => {
        return (
            <View className="h-full w-24 flex-row justify-center items-center">
                <TouchableOpacity className="h-full justify-center items-center gap-1">
                    <Anticon
                        name={`${item.pinned ? 'pushpin' : 'pushpino'}`}
                        size={25}
                        color='#7468F3'
                        onPress={() => pinning()}
                    />
                    <Text className="text-white font-pthin text-xs">Pin</Text>
                </TouchableOpacity>
            </View>
        );
    }

    async function getMessageData() {
        console.log("function called")
        try {
          const { data, error, count } = await supabase
            .from('messages')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false })
            .eq('chat_id', item.id)
            .limit(1);
          if (error) {
            console.log(error)
            throw error
          }
          if (data) {
            setTotalMessages(count)
            setLastMessage(data[0].content)
          }
        } catch (error) {
          if (error instanceof Error) {
            Alert.alert(error.message)
          }
        }
      }
    
      useEffect(() => {
        getMessageData()
      }, [])

    async function pinning() {
        try {
          const { data, error } = await supabase
            .from('chats')
            .update({ pinned: !item.pinned })
            .eq('id', item.id)
            .select()
          if (error) {
            throw error
          }
          if (data && refresh) {
            refresh()
          }
        } catch (error) {
          if (error instanceof Error) {
            Alert.alert(error.message)
          }
        }
      }
      
  return (
    <Swipeable renderRightActions={renderRightActions} renderLeftActions={renderLeftActions}>
        <Pressable className="w-full" onPress={() => router.push(`/chat/${item.id}`)} >
            <View className="flex-row justify-start items-center px-4 gap-4 bg-primary">
                <Anticon
                    name='user'
                    size={30}
                    color='white'
                />
                <View className="flex-1 p-4 border-y-[1px] border-black-200">
                    <Text className="text-white text-lg font-psemibold">{formatedDate}</Text>
                    <Text className="text-secondary-100 font-pextralight">{lastMessage}</Text>
                </View>
                <Anticon
                    name='right'
                    size={20}
                    color='white'
                />
            </View>

        </Pressable>
    </Swipeable>
  )
}

export default ChatCard