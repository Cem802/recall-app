import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import Ionicon from '@expo/vector-icons/Ionicons'

const FormField = ({
    title,
    value,
    placeholder,
    handleChangeText,
    keyboardType,
    otherStyles,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false)
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row">
        <TextInput
            className="flex-1 text-white font-psemibold text-base" 
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7b7b8b"
            onChangeText={handleChangeText}
            secureTextEntry={title === 'Password' && !showPassword}
        />

        {title === 'Password' && (
            <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
            >
                <Ionicon
                    name={!showPassword ? 'eye' : 'eye-off'}
                    size={20}
                    color='#7b7b8b'
                />
            </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField