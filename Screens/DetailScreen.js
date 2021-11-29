import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, ListItem, Button, Icon } from 'react-native-elements'

const DetailScreen = ({route}) => {
    const {nombre} = route.params;
    const {lon} = route.params;
    const {lat} = route.params;
    const [datos, setDatos]=useState([]);
    useEffect(()=>{
        const apikey ='437fda1a378e4de965b26c33814641ff';
        const api_url=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=${apikey}&units=metric`
        fetch(api_url)
            .then(data => {
                return data.json()
            }).then(resultado=>
            {           
                let temp = [];
                temp = resultado.daily;
                setDatos(temp);
                test(resultado.daily)
            });
    },[])
    const test = (a,b) =>{         
        console.log(b)
        var day = new Date(a * 1000);  
        if(b==0){
            return "Pronostico del dia"
        }
        else{
            return day.toLocaleString("x", { weekday: "long" }).toUpperCase(); 
        }               
    }
    return (  
        <View style={styles.container}>   
         <ScrollView>     
            {
                datos.map((a,i)=>
                    <Card>
                    <Card.Title style={{textAlign: "left", fontSize: 20}} >{test(a.dt,i)}</Card.Title>
                    <View key={i}>
                    <Text key={i} style={{textAlign: "center", fontWeight: "bold",  fontSize: 30, color: 'black',}}> {a.temp.day} c°</Text>
                        <Text key={i+1} style={{textAlign: "center", fontSize: 20, color: 'black',}}> Máx: {a.temp.max} c°</Text>
                        <Text key={i+2} style={{textAlign: "center", fontSize: 20, color: 'black',}}> Min: {a.temp.min} c°</Text>
                    </View> 
                    </Card>            
                )
            }
          </ScrollView>                
        </View>        
      );
} 
export default DetailScreen;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'column',
      alignItems: 'stretch',
      justifyContent: 'center',
      backgroundColor: '#499AA8',
    },
  });