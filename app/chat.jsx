import { View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '../components/Input'
import KeyboardUsingContainer from '../components/KeyboardUsingContainer'
import Header from '../components/Header'

const chat = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
        <KeyboardUsingContainer>
            <View className="h-full justify-between">
                <Header title="Chat" />
                <View></View>
                <Input placeholder="Write down your thoughts..." />
            </View>
        </KeyboardUsingContainer>
    </SafeAreaView>
  )
}

export default chat