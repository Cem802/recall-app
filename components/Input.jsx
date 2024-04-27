import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const Input = ({placeholder, onSendMessage, buttonDown}) => {
    const [input, setInput] = useState('')
    const [height, setHeight] = useState(0);
  return (
    <View className="w-full items-center justify-center p-2 gap-2 flex-row">
        <TextInput
            placeholder={placeholder}
            placeholderTextColor="#787A91"
            multiline={true}
            onContentSizeChange={event => {
            if (event.nativeEvent.contentSize.height < 501) {
                setHeight(event.nativeEvent.contentSize.height);
            } else {
                setHeight(500);
            }
            }}
            value={input}
            onChangeText={setInput}
            className="flex-1 h-[50px] border-2 border-gray-400 overflow-hidden rounded-full"
        />
        <TouchableOpacity
            className="h-[45px] w-[45px] bg-secondary rounded-full items-center justify-center mb-2"
            onPress={() => {
                console.log("button pressed")
                onSendMessage(input);
                setInput('');
            }}>
        </TouchableOpacity>
    </View>
  )
}

export default Input