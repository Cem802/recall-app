import { View, Text, TouchableOpacity, } from 'react-native'
import React from 'react'
import Anticon from '@expo/vector-icons/AntDesign'
import Swipeable from 'react-native-gesture-handler/Swipeable'

const ChatCard = ({date, message}) => {
    const renderRightActions = () => {
        return (
            <View className="h-full w-48 flex-row justify-center items-center">
                <TouchableOpacity className="h-full justify-center items-center gap-1 w-24">
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

      
  return (
    <Swipeable renderRightActions={renderRightActions} >
    <View className="w-full">
        <View className="flex-row justify-start items-center px-4 gap-4 bg-primary">
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
    </Swipeable>
  )
}

export default ChatCard