import { View, Text } from 'react-native'
import React from 'react'
import CustomButton from '../../components/CustomButton'
import { supabase } from '../../lib/supabase'
import { SafeAreaView } from 'react-native-safe-area-context'

const profile = () => {
  async function signOut() {
    const { error } = await supabase.auth.signOut()
  }  
  return (
    <SafeAreaView className="h-full bg-primary">
      <Text>profile</Text>
      <CustomButton title="Sign Out" handlePress={signOut}/>
    </SafeAreaView>
  )
}

export default profile