import { View, Text, TouchableOpacity, } from 'react-native'
import React from 'react'
import Anticon from '@expo/vector-icons/AntDesign'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { useGlobalContext } from '../context/GlobalProvider'
import { supabase } from '../lib/supabase'

const InfoCard = () => {
    return (
        <View className="p-5">
            <View className="bg-[#6152B7] rounded-xl">
                <View className="flex-row justify-between items-center p-5">
                    <Text className="text-white font-pregular text-base">Date</Text>
                    <Text className="text-white font-pregular text-base">12-02-2024</Text>
                </View>
                <View className="w-full h-[1px] bg-secondary" />
                <View className="flex-row justify-between items-center p-5">
                    <Text className="text-white font-pregular text-base">Topic</Text>
                    <Text className="text-white font-pregular text-base">Cars</Text>
                </View>
                <View className="w-full h-[1px] bg-secondary-100" />
                <View className="flex-row justify-between items-center p-5">
                    <Text className="text-white font-pregular text-base">Total Messages</Text>
                    <Text className="text-white font-pregular text-base">142</Text>
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

const ChatCard = ({date, message, pinned, id, refresh}) => {
    const { setBottomSheet } = useGlobalContext()
    const renderRightActions = () => {
        return (
            <View className="h-full w-48 flex-row justify-center items-center">
                <TouchableOpacity className="h-full justify-center items-center gap-1 w-24" onPress={() => setBottomSheet({header: "Chat Info", content: <InfoCard />})}>
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
                        name={`${pinned ? 'pushpin' : 'pushpino'}`}
                        size={25}
                        color='#7468F3'
                        onPress={() => pinning()}
                    />
                    <Text className="text-white font-pthin text-xs">Pin</Text>
                </TouchableOpacity>
            </View>
        );
    }

    async function pinning() {
        try {
          const { data, error } = await supabase
            .from('chats')
            .update({ pinned: !pinned })
            .eq('id', id)
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
    <View className="w-full">
        <View className="flex-row justify-start items-center px-4 gap-4 bg-primary">
            <Anticon
                name='user'
                size={30}
                color='white'
            />
            <View className="flex-1 p-4 border-y-[1px] border-black-200">
                <Text className="text-white text-lg font-psemibold">{
                    new Date(date).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    })
                }</Text>
                <Text className="text-secondary-100 font-pextralight">{message}</Text>
            </View>
            <Anticon
                name='right'
                size={20}
                color='white'
            />
        </View>

    </View>
    </Swipeable>
  )
}

export default ChatCard