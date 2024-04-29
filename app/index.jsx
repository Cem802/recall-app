import { Button, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import { Redirect, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useGlobalContext } from '../context/GlobalProvider';


export default function App() {
  const { isLoading, isLoggedIn, user } = useGlobalContext()

  if(!isLoading && isLoggedIn) return <Redirect href='/home' />
  return (
    <SafeAreaView className="bg-primary h-full">
      <LinearGradient
          colors={['#0E0C1D', '#07060E']}
          className="absolute h-[100vh] left-0 right-0 top-0"
      />
      <ScrollView contentContainerStyle={{ height: '100%'}}>
        <View className="w-full justify-center items-center h-full p-10">
          <Text className="text-white text-5xl font-pbold text-center">
            Welcome to <Text className="text-secondary">Recall</Text>
          </Text>
          <Text className=" text-gray-400 text-sm font-pregular text-center mt-2">
            A place to store your thoughts, where you will never forget them again.
          </Text>
          <CustomButton title="Continue" containerStyles="mt-7 w-full" handlePress={() => router.push('/sign-in')}/>
          <Text>User: {user?.id}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
