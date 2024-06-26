import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Tabs } from 'expo-router'

import Anticons from '@expo/vector-icons/AntDesign'
import { useGlobalContext } from '../../context/GlobalProvider'

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2">
        <Anticons
            name={icon}
            size={20}
            color={color}
        />
      <Text
        className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}
        style={{ color: color}}
      >
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  const { isLoading, isLoggedIn } = useGlobalContext()

  if(!isLoading && !isLoggedIn) return <Redirect href='/' />
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#7468F3',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            backgroundColor: '#07060E',
            borderTopWidth: 1,
            borderTopColor: '#0E0C1D',
            height: 84,
          }
        }}
      >
        <Tabs.Screen
          name='reminders'
          options={{
            title: 'Reminders',
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
              <TabIcon
                icon='bells'
                color={color}
                name='Reminders'
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name='home'
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
              <TabIcon
                icon='home'
                color={color}
                name='Home'
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name='profile'
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
              <TabIcon
                icon='user'
                color={color}
                name='Profile'
                focused={focused}
              />
            )
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout