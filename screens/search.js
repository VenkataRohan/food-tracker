import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState} from "react";
import { StyleSheet, Text,TextInput,Button, View,Alert,FlatList ,TouchableOpacity } from 'react-native';
import axios from 'axios'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
export default function Home({ navigation, route }) {
  const [text, onChangeText] = React.useState("");
  const [arr,setArr]=useState([])
    const {data1,inwater,id}=route.params
 useEffect(()=>{
  if(text!="")
  {
    axios.get('https://api.spoonacular.com/food/ingredients/search', {
      params: {
        apiKey:"a72ab82af6b44a40962ba99931f30e21",
        query:text,
        number:5
      }
  })
  .then(function (response) {
    console.log(response.data.results);
    var t=[]
    // var data = JSON.stringify(response.data);
    // data = JSON.parse(data);
    response.data.results.forEach(element => {
      t.push(element)
    });
    setArr(t)
    console.log(arr);
})
.catch(function (error) {
    console.log(error);
})
 //setArr([{name:"apple",id:12}])
// console.log("1212");
   }
  },[text])


const onPress=(item)=>{
  console.log("12321323");
  navigation.navigate("summary",{item,homeData:data1,inwater,id})
}
  return (
    <View style={styles.container}>
    <StatusBar style="auto" />
    <View style={styles.fixToText}>
    <TextInput
    style={styles.input}
    onChangeText={onChangeText}
    placeholder="search"
    value={text}
  />
     
      </View>
    
      <FlatList
      data={arr}
      style={{width:200}}
      renderItem={({item})=> ( 
        <TouchableOpacity
        style={styles.button}
        onPress={()=>onPress(item)}
      >
      <Text style={{fontSize:25}}>{item.name}</Text>
      </TouchableOpacity> )}
      keyExtractor={item => item.id}
    />
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width:200,
    height:60
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'center',
    width:400,
    paddingTop:50,    
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    height:60
  },
});
