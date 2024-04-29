import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'

import { supabase } from '../../lib/supabase'

const SignUp = () => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function signUpWithEmail() {
        if(!form.username || !form.email || !form.password) {
            Alert.alert('Error', 'Please fill in all fields')
        }
        setIsSubmitting(true)
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            displayName: form.username,
            email: form.email,
            password: form.password,
        })
        if (error) Alert.alert(error.message)
        if (!session) Alert.alert('Please check your inbox for email verification!')
        setIsSubmitting(false)
    }

  return (
    <SafeAreaView className="bg-primary h-full">
        <LinearGradient
            colors={['#0E0C1D', '#07060E']}
            className="absolute h-[100vh] left-0 right-0 top-0"
        />
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">

          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Sign Up to Recall</Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign Up"
            handlePress={signUpWithEmail}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link href="/sign-in" className="text-lg font-psemibold text-secondary">
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp