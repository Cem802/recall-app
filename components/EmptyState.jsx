import { View, Text } from 'react-native'
import React from 'react'

import CustomButton from './CustomButton'
import Anticon from '@expo/vector-icons/AntDesign'

const EmptyState = ({ title, subtitle, buttonText, handlePress}) => {
  return (
    <View className="h-full justify-center items-center px-4">
        <View className="m-5">
            <Anticon name='exclamationcircleo' size={50} color='white'/>
        </View>
        
        <Text className="text-xl font-psemibold text-white mt-2">
            {title}
        </Text>
        <Text className="font-pmedium text-sm text-gray-100 text-center">
            {subtitle}
        </Text>

        <CustomButton
            title={buttonText}
            handlePress={handlePress}
            containerStyles="w-full m-8"
        />
    </View>
  )
}

export default EmptyState