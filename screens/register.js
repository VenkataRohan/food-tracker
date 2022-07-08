import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, View, Button, FlatList, TouchableHighlight, Modal, Alert } from 'react-native';

import { auth ,data} from '../firebase'

//const config = "10.59.109.11"


const Register = ({ navigation, route }) => {
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
  
    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          if (user) {
        

           var today = new Date();
  var date =""
  if(today.getDate()/10==0)
  date=date+today.getDate()+"-"
  else
  date=date+"0"+today.getDate()+"-"
  if((today.getMonth()+1)/10==0)
  date=date+(today.getMonth()+1)+"-"
  else
  date=date+"0"+(today.getMonth()+1)+"-"
  date+=today.getFullYear()
          navigation.replace("home",{data:{[date]:{protein:0,fat:0,water:0,calories:0,carbs:0}},id:user.uid})
          }
        })
        return unsubscribe
      }, [])
    
    
   
  
    const handleSignUp = () => {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
          const user = userCredentials.user;
        
          data.doc(user.uid).set({
            name,
            date:{
              "07-07-2022":{protein:0,fat:0}
            }
          })
            
        })
        .catch(error => alert(error.message))
    }
  
   


  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.inputContainer}>
      <TextInput
          placeholder="name"
          value={name}
          onChangeText={text => setName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
       
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}
export {Register}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputContainer: {
      width: '80%'
    },
    input: {
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
    },
    buttonContainer: {
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },
    button: {
      backgroundColor: '#0782F9',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonOutline: {
      backgroundColor: 'white',
      marginTop: 5,
      borderColor: '#0782F9',
      borderWidth: 2,
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
    buttonOutlineText: {
      color: '#0782F9',
      fontWeight: '700',
      fontSize: 16,
    },
  })