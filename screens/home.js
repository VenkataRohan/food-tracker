import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState} from "react";
import { StyleSheet, Text,TextInput,Button, View,Alert,FlatList ,TouchableOpacity,ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import {fdata, auth} from '../firebase'
import { Ionicons,FontAwesome } from '@expo/vector-icons';
export default function Home({ navigation, route }) {
  const [text, onChangeText] = React.useState("");
  const [arr,setArr]=useState()
  const [inwater,Setwater]=useState(0)
  const {data,id}=route.params
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

var data1={}
  if(data[date]==undefined)
  {
    //data[date]={protein:0,fat:0,water:0}
    
    data1[date]={protein:0,fat:0,water:0,calories:0,carbs:0}
    for(var item in data)
    {
      data1[item]=data[item]
    }
    
   
    fdata.doc(id).update({
      date: data1
    }).then(function() {
      
    });
  }
  else
  data1=data
  useEffect(()=>{
    
    Setwater(parseFloat(data1[date].water))

  },[])
  useEffect(()=>{

data1[date].water=inwater
    fdata.doc(id).update({
      date: data1
    }).then(function() {
     // console.log("updated");
    });
  },[inwater])
const onPress=()=>{

  navigation.navigate("search",{data1,inwater,id})
}
  return (
    <View style={styles.container}>
    <StatusBar style="auto" />
   
    <View style={styles.row}>
    <Button title="Add Food intake"
    color="#841584" onPress={onPress}/>
    <Button onPress={()=>{
      auth
      .signOut()
      .then(() => {
        
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'login',
              },
            ],
          })
      })
      .catch(error => alert(error.message))
    }}
    title="Logout"
  color="#841584"/>


     
     </View>
   <View style={styles.row2}>
<Text size={35} style={{height:40,width:200,fontSize:35,fontStyle:"italic"}}>Water {inwater} L</Text>

<Ionicons name="add-circle" size={35} color="black"  onPress={()=>{
  Setwater(val=>Math.min(5,parseFloat(val+0.1).toFixed(1)))
}}/>


<FontAwesome name="minus-circle" size={35} color="black" onPress={()=>{
  Setwater(val=>Math.max(0,parseFloat(val-0.1).toFixed(1)))
}}/> 
</View>
   <DataTable>
   <DataTable.Header>
     <DataTable.Title >date </DataTable.Title>
     <DataTable.Title numeric>water</DataTable.Title>
     <DataTable.Title numeric>calories</DataTable.Title>
     <DataTable.Title numeric>protein</DataTable.Title>
     <DataTable.Title numeric>fat</DataTable.Title>
     <DataTable.Title numeric>carbs</DataTable.Title>
   
   
   </DataTable.Header>

   

   <FlatList
   data={Object.entries(data1)}
   renderItem={({item})=>{  
    if(item[0]==date){ 
     
      return (
    <DataTable.Row >
     <DataTable.Cell >{item[0]}</DataTable.Cell>
     <DataTable.Cell numeric>{inwater}</DataTable.Cell>
     <DataTable.Cell numeric>{item[1].calories}</DataTable.Cell>
     <DataTable.Cell numeric>{item[1].protein}</DataTable.Cell>
     <DataTable.Cell numeric>{item[1].fat}</DataTable.Cell>
     <DataTable.Cell numeric>{item[1].carbs}</DataTable.Cell>
     
   </DataTable.Row>
  )}else{
   
    return(
      <DataTable.Row >
      <DataTable.Cell >{item[0]}</DataTable.Cell>
      <DataTable.Cell numeric>{item[1].water}</DataTable.Cell>
      <DataTable.Cell numeric>{item[1].calories}</DataTable.Cell>
      <DataTable.Cell numeric>{item[1].protein}</DataTable.Cell>
      <DataTable.Cell numeric>{item[1].fat}</DataTable.Cell>
      <DataTable.Cell numeric>{item[1].carbs}</DataTable.Cell>
      
    </DataTable.Row>
  )
  }
    }
   }
   
   keyExtractor={(item,ind) => ind}
 />


 </DataTable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   paddingTop:20
  
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
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent:"space-around"
  },
  row2: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent:"space-around",
    paddingTop:30,
    paddingBottom:30
  },
});
