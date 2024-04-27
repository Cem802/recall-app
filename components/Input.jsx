import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Anticons from '@expo/vector-icons/AntDesign'

const Input = ({placeholder, onSendMessage, buttonDown}) => {
    const [input, setInput] = useState('')
    const [height, setHeight] = useState(0);
    const borderRadius = height < 80 ? 50 : height < 150 ? 45 : height < 200 ? 40 : height < 250 ? 35 : height < 300 ? 30 : 25;
  return (
    <View className="w-full items-end justify-center p-2 gap-2 flex-row">
        <TextInput
            placeholder={placeholder}
            placeholderTextColor="#787A91"
            multiline={true}
            onContentSizeChange={event => {
            if (event.nativeEvent.contentSize.height < 501) {
                setHeight(event.nativeEvent.contentSize.height+30);
            } else {
                setHeight(500);
            }
            }}
            value={input}
            onChangeText={setInput}
            className="flex-1 border-2 border-gray-400 overflow-hidden text-white px-[20px] pt-[15px]"
            style={{borderRadius: borderRadius, height: Math.max(50, height) }}
        />
        <TouchableOpacity
            className="h-[45px] w-[45px] bg-secondary rounded-full items-center justify-center mb-1"
            onPress={() => {
                console.log("button pressed")
                onSendMessage(input);
                setInput('');
            }}>
                <Anticons name={buttonDown ? 'arrowdown' : 'arrowup'} size={20} color='white'/>
        </TouchableOpacity>
    </View>
  )
}

export default Input