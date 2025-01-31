import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import Start from './components/Start';
import Chat from './components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { getStorage } from "firebase/storage";
import { LogBox, Alert } from "react-native";

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {

  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  const firebaseConfig = {
    apiKey: "AIzaSyAjUSC2PA56DoORlcCo5anrGZEfXUsooq4",
    authDomain: "chatapp-22e6d.firebaseapp.com",
    projectId: "chatapp-22e6d",
    storageBucket: "chatapp-22e6d.appspot.com",
    messagingSenderId: "507938311008",
    appId: "1:507938311008:web:04b1261a84f820ae16ac05"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  const storage = getStorage(app);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat">
            {props => <Chat 
            isConnected={connectionStatus.isConnected} 
            db={db} 
            storage={storage} 
            {...props}
            />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
