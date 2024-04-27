import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React from 'react'
import MCIicon from '@expo/vector-icons/MaterialCommunityIcons'

const mockChats = [
    {
        id: 1,
        Date: '27-08-2021',

    }
]

const home = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
        <FlatList
        data={mockChats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>{item.Date}</Text>
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

            <View className="2-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest Chats
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <></>
        )}
      />
    </SafeAreaView>
  )
}

export default home