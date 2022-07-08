import React from 'react';
import {  StyleSheet, Text, ImageBackground,TextInput, TouchableOpacity, ScrollView, View, Button, FlatList, TouchableHighlight, Modal, Alert } from 'react-native';


const image = { uri: "../assets/i.jpg" };
import { auth,data } from '../firebase'
function Logo({ navigation, route }) {
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
       // console.log(user.uid);
        data.doc(user.uid).get()
        .then((doc) => {
          if (doc.exists) {
              console.log("Document data:", doc.data().date);
              var data=doc.data().date
              var k=Object.keys(data).sort()
              k.reverse()
              //console.log( k );
              var ob={}
              k.forEach(element => {
                ob[element]=data[element]
              })
              navigation.replace("home",{data:ob,id:user.uid})
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      }).catch((error) => {
          console.log("Error getting document:", error);
      });
       
        
      }else{
        //setC("login")
        console.log("else");
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'login',
            },
          ],
        })
      }
    })

    return unsubscribe
  }, [])
 
  return (
   
    <ImageBackground source={require('../assets/i.jpg')} resizeMode="cover" style={styles.image}>
    
  </ImageBackground>
   
    
  )
  
  }


  export {Logo}

  const styles = StyleSheet.create({
  
    container: {
      paddingTop: 40,
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      flex: 1,
      justifyContent: "center",
      height:600,
      paddingTop :300,
      paddingBottom:100
    },
  });