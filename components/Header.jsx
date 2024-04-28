import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Anticon from '@expo/vector-icons/AntDesign'
import { router } from 'expo-router'

const Header = ({title}) => {
  return (
    <View className="flex-row justify-between items-center p-5 w-full h-[80px]">
      <TouchableOpacity className="flex-1 h-full justify-center" onPress={() => router.back()}>
        <Anticon name='left' size={25} color='white' />
      </TouchableOpacity>
      <View className=" flex-[3] h-full justify-center items-center">
        <Text className="text-white text-2xl font-bold">{title}</Text>
      </View>
      <TouchableOpacity className="flex-1 items-end h-full justify-center">
        <Anticon name='delete' size={25} color='white'/>
      </TouchableOpacity>
    </View>
  )
}

export default Header