import {
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    View
  } from 'react-native';
import React from 'react'

const KeyboardUsingContainer = ({children}) => {
    return (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <View onPress={Keyboard.dismiss}>
            {children}
          </View>
        </KeyboardAvoidingView>
      );
}


export default KeyboardUsingContainer