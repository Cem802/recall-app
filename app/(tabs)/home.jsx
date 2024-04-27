import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React from 'react'
import MCIicon from '@expo/vector-icons/MaterialCommunityIcons'
import ChatCard from '../../components/ChatCard'
import { LinearGradient } from 'expo-linear-gradient'
import EmptyState from '../../components/EmptyState'
import { Link, router } from 'expo-router'
import Anticon from '@expo/vector-icons/AntDesign'

const mockChats = [
    {
        id: 1,
        Date: '27-08-2021',
        lastMessage: 'Hello, how are you?',
    },
    {
        id: 2,
        Date: '25-08-2021',
        lastMessage: 'Alright, see you later',
    }
]

const home = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
        <LinearGradient
            colors={['#0E0C1D', '#07060E']}
            className="absolute h-[100vh] left-0 right-0 top-0"
        />
        <FlatList
        data={mockChats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatCard date={item.Date} message={item.lastMessage} />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back,
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  Cem
                </Text>
              </View>

              <View className="mt-1.5">
                <MCIicon
                    name='star-four-points'
                    size={30}
                    color='#7468F3'
                />
              </View>
            </View>

            {/* <SearchInput /> */}

            <View className="flex-row justify-between">
                <Text className="text-gray-100 text-4xl font-pbold">
                    Chats
                </Text>
                <Anticon name='pluscircleo' size={25} color='white' onPress={() => router.push('/chat')}/>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No Chats Yet'
            subtitle='Start a new conversation by tapping the button below'
            buttonText='Start a Chat'
            handlePress={() => router.push('/chat')}
          />
        )}
      />
    </SafeAreaView>
  )
}

export default home