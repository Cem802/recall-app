import { View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '../components/Input'
import KeyboardUsingContainer from '../components/KeyboardUsingContainer'
import Header from '../components/Header'
import { LinearGradient } from 'expo-linear-gradient'

const chat = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <LinearGradient
          colors={['#0E0C1D', '#07060E']}
          className="absolute h-[100vh] left-0 right-0 top-0"
      />
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