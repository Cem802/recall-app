import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
} from 'react-native-reanimated';
import Anticon from '@expo/vector-icons/AntDesign'
import { useGlobalContext } from '../context/GlobalProvider';
import { runOnJS } from 'react-native-reanimated';

const BottomSheet = () =>{
    const { bottomSheet, setBottomSheet } = useGlobalContext()

    const position = useSharedValue(400);

    useEffect(() => {
        position.value = 400
        position.value = withTiming(0, { duration: 300 }); // Animate to normal position when component mounts
    }, [bottomSheet]);


    const panGesture = Gesture.Pan()
        .onUpdate((e) => {
            if (e.translationY < -400) {
                return
            } else if (e.translationY < 0) {
                position.value = e.translationY * 0.05
                return
            } else {
                position.value = e.translationY
            }
        })
        .onEnd((e) => {
            if (e.translationY > 200) {
                position.value = withTiming(500, { duration: 300 }, () => {
                    runOnJS(setBottomSheet)();
                });
            } else {
                position.value = withTiming(0, { duration: 300 });
            }
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: position.value }],
    }));
    if (!bottomSheet) return null;
    return (
        <>
            <View className="h-full w-full absolute top-0 left-0 bg-black opacity-60"/>
            <GestureDetector gesture={panGesture}>
                <Animated.View style={animatedStyle} className="absolute -bottom-[600px] left-0 h-[1000px] w-full bg-[#50429E] rounded-3xl">
                    <View className="flex-row w-full justify-between items-center p-5">
                        <Text className="text-xl font-psemibold text-white">{bottomSheet && bottomSheet.header}</Text>
                        <Anticon
                            name='closecircleo'
                            size={25}
                            color='white'
                            onPress={() => position.value = withTiming(500, { duration: 300 }, () => {
                                runOnJS(setBottomSheet)();
                            })}
                        />
                    </View>
                    {bottomSheet && bottomSheet.content}
                </Animated.View>
            </GestureDetector>
        </>
    )
}

export default BottomSheet