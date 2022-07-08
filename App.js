import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState} from "react";
import { StyleSheet, Text,TextInput,Button, View,Alert  } from 'react-native';
import axios from 'axios'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './screens/login';
import { Logo } from './screens/logo';
import Home from './screens/home';
import { Register } from './screens/register';
import Summary from './screens/summary';
import Search from './screens/search';

const Stack = createNativeStackNavigator();
export default function App() {
  const [text, onChangeText] = React.useState("");
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="logo">
      
        <Stack.Screen
          name="login"
          component={Login}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen
      name="logo"
      component={Logo}
      
    />
        <Stack.Screen
          name="home"
          component={Home}
          options={{ title: 'home' }}
        />
        <Stack.Screen
          name="register"
          component={Register}
          options={{ title: 'register' }}
        />
        <Stack.Screen
        name="summary"
        component={Summary}
        options={{ title: 'summary' }}
      />
      <Stack.Screen
        name="search"
        component={Search}
        options={{ title: 'search' }}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

});
