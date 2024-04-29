import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import Anticon from '@expo/vector-icons/AntDesign'
import MCIIcon from '@expo/vector-icons/MaterialCommunityIcons'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'

const ChatView = ({ messages, loading }) => {

    const renderMessage = ({ item }) => (
        item.from === 'User' ? (
            <View className="flex-row justify-end items-end my-2">
                <LinearGradient
                    colors={['#2E1DED', '#3F2FEE' ]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    className="max-w-[90%] p-3 rounded-xl rounded-br-none"
                >
                    <Text className="font-pmedium text-xs text-[#958EF6]">You</Text>
                    <Text className="font-pregular text-sm text-white">
                        {item.content}
                    </Text>
                </LinearGradient>
                <View style={{
                    width: 0,
                    height: 0,
                    backgroundColor: "transparent",
                    borderStyle: "solid",
                    borderRightWidth: 5,
                    borderTopWidth: 5,
                    borderRightColor: "transparent",
                    borderTopColor: "#3F2FEE",
                    transform: [{ rotate: "270deg" }]
                }} />
            </View>
        ) : (
            <View className="flex-row justify-start items-end my-2">
                <View style={{
                    width: 0,
                    height: 0,
                    backgroundColor: "transparent",
                    borderStyle: "solid",
                    borderRightWidth: 5,
                    borderTopWidth: 5,
                    borderRightColor: "transparent",
                    borderTopColor: "#B9B4F9",
                    transform: [{ rotate: "180deg" }]
                }} />
                <View className="bg-[#B9B4F9] max-w-[90%] p-3 rounded-xl rounded-bl-none">
                    <Text className="font-pmedium text-xs text-[#3F2FEE]">RecallAI</Text>
                    <Text className="font-pregular text-sm">
                        {item.content}
                    </Text>
                </View>
            </View>
        )
    );

    const renderLoading = () => (
        <View className="justify-center items-center">
            <ActivityIndicator size="small" color="#fff" />
        </View>
    );

    const renderEmpty = () => (
        <View className="justify-center items-center flex-1">
          <View className="bg-white rounded-full h-10 w-10 justify-center items-center">
            <MCIIcon name="star-four-points" size={25} color="#000" />
          </View>
        </View>
    )

    return  (
        <>
            {loading ? (
                renderLoading()
            ) : messages.length === 0 ? (
                renderEmpty()
            ) :  (
                <FlatList
                    data={messages}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderMessage}
                    className="p-5"
                    inverted
                />
            )}
        </>
    )
}

export default ChatView