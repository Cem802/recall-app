import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import CustomButton from '../components/CustomButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '../components/Input'

const chat = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View className="h-full justify-between">
                <View></View>
                <Input />
            </View>
        </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export default chat