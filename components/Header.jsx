import { View, Text } from 'react-native'
import React from 'react'
import Anticon from '@expo/vector-icons/AntDesign'

const Header = ({title}) => {
  return (
    <View className="flex-row justify-between items-center p-5">
        <Anticon name='menu-fold' size={25} color='white'/>
        <Text className="text-white text-2xl font-bold">{title}</Text>
        <Anticon name='delete' size={25} color='white'/>
    </View>
  )
}

export default Header