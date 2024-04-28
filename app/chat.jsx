import { View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '../components/Input'
import KeyboardUsingContainer from '../components/KeyboardUsingContainer'
import Header from '../components/Header'
import { LinearGradient } from 'expo-linear-gradient'
import ChatView from '../components/ChatView'

const chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user_id: 1,
      sender: 'user',
      content: 'Hello, how are you doing?',
      created_at: '2021-09-20T12:00:00Z',
      chat_id: 1
    },
    {
      id: 2,
      user_id: 1,
      sender: 'user',
      content: 'Hello, how are you doing? I am doing fine, thank you for asking. How about you?',
      created_at: '2021-09-20T12:00:00Z',
      chat_id: 1
    },
    {
      id: 3,
      sender: 'ai',
      content: 'Hello, how are you doing?',
      created_at: '2021-09-20T12:00:00Z',
      chat_id: 1
    },
  ])
  return (
    <SafeAreaView className="bg-primary h-full">
      <LinearGradient
          colors={['#0E0C1D', '#07060E']}
          className="absolute h-[100vh] left-0 right-0 top-0"
      />
        <KeyboardUsingContainer>
            <View className="h-full justify-between">
                <Header title="Chat" />
                <ChatView messages={messages} />
                <Input placeholder="Write down your thoughts..." />
            </View>
        </KeyboardUsingContainer>
    </SafeAreaView>
  )
}

export default chat