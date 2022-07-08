import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, View, Button, FlatList, TouchableHighlight, Modal, Alert } from 'react-native';

import { auth ,data} from '../firebase'

//const config = "10.59.109.11"

//const config="192.168.1.15"

const Login = ({ navigation, route }) => {
 
    const [email, setEmail] = React.useState('venkatarohank@gmail.com')
    const [password, setPassword] = React.useState('123456')
  
    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          if (user) {
           
           
           data.doc(user.uid).get()
           .then((doc) => {
          if (doc.exists) {
            
              var data=doc.data().date
              var k=Object.keys(data).sort()
              k.reverse()
             // console.log( k );
              var ob={}
              k.forEach(element => {
                ob[element]=data[element]
              })
              navigation.replace("home",{data:ob,id:user.uid})
          } else {
              // doc.data() will be undefined in this case
             
          }
      }).catch((error) => {
          console.log("Error getting document:", error);
      }); 
           

          }
        })
        return unsubscribe
      }, [])
    
    
   
  
    const handleSignUp = () => {
      navigation.replace("register")
      
    }
  
    const handleLogin = () => {
      auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
          const user = userCredentials.user;
          console.log('Logged in with:', user.email);
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
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
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
export {Login}

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