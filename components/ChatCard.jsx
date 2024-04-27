import { View, Text } from 'react-native'
import React from 'react'
import Anticon from '@expo/vector-icons/AntDesign'

const ChatCard = ({date, message}) => {
  return (
    <View className="w-full">
        <View className="flex-row justify-start items-center px-4 gap-4">
            <Anticon
                name='user'
                size={30}
                color='white'
            />
            <View className="flex-1 p-4 border-y-[1px] border-black-200">
                <Text className="text-white text-lg font-psemibold">{date}</Text>
                <Text className="text-secondary-100 font-pextralight">{message}</Text>
            </View>
            <Anticon
                name='right'
                size={20}
                color='white'
            />
        </View>

    </View>
  )
}

export default ChatCard