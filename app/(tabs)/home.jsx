import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import MCIicon from '@expo/vector-icons/MaterialCommunityIcons'
import ChatCard from '../../components/ChatCard'
import { LinearGradient } from 'expo-linear-gradient'
import EmptyState from '../../components/EmptyState'
import { Link, router } from 'expo-router'
import Anticon from '@expo/vector-icons/AntDesign'
import { useGlobalContext } from '../../context/GlobalProvider'
import { supabase } from '../../lib/supabase'

const home = () => {
  const { user } = useGlobalContext()
  const [username, setUsername] = useState('')
  const [usernameLoading, setUsernameLoading] = useState(true)
  const [chats, setChats] = useState([])
  const [chatsLoading, setChatsLoading] = useState(true)
  const [creatingChat, setCreatingChat] = useState(false)

  async function getUsername() {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()
      if (error) {
        throw error
      }
      if (data) {
        setUsername(data.username)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setUsernameLoading(false)
    }
  }

  async function getChatData() {
    try {
      const { data, error } = await supabase
        .from('chats')
        .select('*')
        .eq('user_id', user.id)
      if (error) {
        throw error
      }
      if (data) {
        setChats(data)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setChatsLoading(false)
    }
  }

  useEffect(() => {
    getUsername()
    getChatData()
  }, [])

  async function newChat() {
    try {
      setCreatingChat(true)
      const { data, error } = await supabase
        .from('chats')
        .insert([
          { user_id: user.id},
        ])
        .select()
      if (error) {
        throw error
      }
      if (data) {
        chats.push(data[0])
        router.push(`/chat/${data[0].id}`)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setCreatingChat(false)
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
        <LinearGradient
            colors={['#0E0C1D', '#07060E']}
            className="absolute h-[100vh] left-0 right-0 top-0"
        />
        <FlatList
        data={chats.sort((a, b) => b.pinned - a.pinned)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatCard item={item} refresh={() => getChatData()}/>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back,
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {username}
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
                <Anticon name='pluscircleo' size={25} color='white' onPress={() => newChat()}/>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No Chats Yet'
            subtitle='Start a new conversation by tapping the button below'
            buttonText='Start a Chat'
            handlePress={() => newChat()}
            isLoading={creatingChat}
          />
        )}
      />
    </SafeAreaView>
  )
}

export default home