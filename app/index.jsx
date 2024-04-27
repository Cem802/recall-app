import { Button, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import { router } from 'expo-router';


export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%'}}>
        <View className="w-full justify-center items-center h-full p-10">
          <Text className="text-white text-5xl font-bold text-center">
            Welcome to Recall!
          </Text>
          <Text className=" text-gray-400 text-lg text-center mt-2">
            A place to store your thoughts, where you will never forget them again.
          </Text>
          <CustomButton title="Enter" containerStyles="mt-7 w-full" handlePress={() => router.push('/home')}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
