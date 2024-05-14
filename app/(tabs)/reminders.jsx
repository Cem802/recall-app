import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import * as Notifications from 'expo-notifications';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { supabase } from '../../lib/supabase';
import Reminder from '../../components/Reminder';
import { ScrollView } from 'react-native-gesture-handler';
import KeyboardUsingContainer from '../../components/KeyboardUsingContainer';

const Reminders = () => {
  const [userinput, setUserinput] = useState("")
  const [allReminders, setAllReminders] = useState([])
  const [newReminderSet, setNewReminderSet] = useState(false)

  const scheduleNotification = async (title, content, time) => {
    const formatedDate = new Date(time);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: content,
      },
      trigger: formatedDate,
    });
  }

  async function queryOpenAI() {
    const currentdate = new Date();
    const prompt = `This is an input from a user from an app to set reminders, answer in this structure(leave out the brackets): [generate a fitting title]@[generate fitting content]@[date in this format "YYYY-MM-DDTHH:MM:SS"(the time right now is ${currentdate})].  The input:`
    try {
      console.log('querying openai')
      const { data, error } = await supabase.functions.invoke('openai', {
          body: { query: prompt + userinput }
      })
      if (error) {
          throw error
      }
      if (data) {
          console.log(data);
          const match = data.split('@');
          const reminder = {
            title: match[0],
            content: match[1],
            date: match[2]
          };
          await scheduleNotification(reminder.title, reminder.content, reminder.date);
          setNewReminderSet(!newReminderSet);
      }
    } catch (error) {
      if (error instanceof Error) {
          Alert.alert(error.message)
      }
    } finally {
      setUserinput("");
    }
  } 

  useEffect(() => {
    Notifications.getAllScheduledNotificationsAsync().then((notifications) => {
      setAllReminders(notifications);
    });
  }, [newReminderSet]);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      setNewReminderSet(!newReminderSet);
    });

    return () => subscription.remove();
  }, [])


  return (
    <KeyboardUsingContainer>
    <SafeAreaView className="bg-primary h-full px-2">
      <Text className="text-2xl text-white m-5 font-pbold">Reminders</Text>
      <ScrollView className="">
        {allReminders.map((notification, index) => (
          <Reminder title={notification.content.title} content={notification.content.body} date={notification.trigger} key={index} />
        ))}
      </ScrollView>
      <FormField
        title="Enter Reminder"
        value={userinput}
        handleChangeText={(e) => setUserinput(e)}
        otherStyles="my-5"
      />
      <CustomButton title="Create Reminder" handlePress={queryOpenAI} />
    </SafeAreaView>
    </KeyboardUsingContainer>
  );
}

export default Reminders;