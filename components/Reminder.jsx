import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import * as Notifications from 'expo-notifications';
import { LinearGradient } from 'expo-linear-gradient';

const Reminder = ({ title, content, date}) => {
    const currentTimestamp = Date.now();
    const triggerTimestamp = currentTimestamp + date.seconds * 1000; 
return (
        <LinearGradient
            colors={['#2E1DED', '#3F2FEE' ]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            className="p-4 rounded-2xl mb-3"
        >
            <Text className="text-white font-pbold">{title}</Text>
            <Text className="text-white font-pregular">{content}</Text>
            <Text className="text-[#958EF6] font-plight">{new Date(triggerTimestamp).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}</Text>
        </LinearGradient>
    )
}

export default Reminder