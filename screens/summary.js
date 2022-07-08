import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState} from "react";
import { StyleSheet, Text,TextInput,Button, View,Alert,FlatList,TouchableOpacity  } from 'react-native';
import axios from 'axios'; 
import { fdata } from '../firebase';

export default function Summary({ navigation, route }) {
  const { item,homeData,inwater,id } = route.params
  const [data,setData]=useState()

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
  
useEffect(()=>{
 // console.log(homeData);
 

    axios.get('https://api.spoonacular.com/recipes/guessNutrition', {
              params: {
                apiKey:"a72ab82af6b44a40962ba99931f30e21",
                title:item.name
              }
          })
          .then(function (response) {
           
            setData(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
},[])

const check=()=>{
  if(data!=undefined)
  {
      return (<View style={{flexDirection:"column", flexWrap: "wrap",justifyContent:"center",}}>

        <Text style={styles.text}>Item Name :{item.name}</Text>
    
<View style={{paddingTop:40,paddingBottom:30}}>
        <Text style={styles.text}>Calories : {data.calories.value}{data.calories.unit} </Text>
        <Text style={styles.text}>Fat : {data.fat.value}{data.fat.unit} </Text>
        <Text style={styles.text}>Protein : {data.protein.value}{data.protein.unit} </Text>
        <Text style={styles.text}>Carbs : {data.carbs.value}{data.carbs.unit} </Text>
        </View>
        </View>)
  }
}

  return (
    <View style={styles.container}>
    <StatusBar style="auto" />
   {check()}
   
 



   <TouchableOpacity
        style={styles.button}
        onPress={()=>{
          
          homeData[date]={protein:parseFloat(homeData[date].protein)+data.protein.value,fat:parseFloat(homeData[date].fat)+data.fat.value,water:inwater,calories:parseFloat(homeData[date].calories)+data.calories.value,carbs:parseFloat(homeData[date].carbs)+data.carbs.value}
       
          fdata.doc(id).update({
            date: homeData
          }).then(function() {
            console.log("updated");
          });
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'home',
                params:{data:homeData,id}
              },
            ],
          })
         }}
      >
        <Text style={{fontSize:25}}>I Ate This</Text>
      </TouchableOpacity>
   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:50,
    backgroundColor: '#fff',
    alignSelf:"center"
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
  button: {
    alignItems: "center",
    backgroundColor: "green",
    padding: 10,
    height:50
  
  },
  text:{
    fontSize:35
  }
});
