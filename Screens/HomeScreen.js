import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Button } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Constants from 'expo-constants';

const HomeScreen = ({ navigation }) => {
  const [lista, setLista] = useState([]);
  const [ciudad, setCiudad] = useState('');
  const [location, setLocation] = useState([]);
  const [temp, setTemp] = useState([]);
  const [consultado, setConsultado]= useState(false);
  const buscar = (ciudad) => {  
    const key = '437fda1a378e4de965b26c33814641ff';
    const api_url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${key}&units=metric`;
    if(ciudad == ""){
      console.log("No se ha seleccionado una ciudad")
    }
    else{
      fetch(api_url)
        .then(data => {
            return data.json();
        }).then(resultado => {
         console.log(resultado);
         console.log(resultado.message)
         if(resultado.message ==="city not found"){
          setConsultado(false);
         }
         
         else{
          setConsultado(true);
          let tempcoord = 0;
          let temptemp =0;
          let temploc = 0;
          tempcoord = resultado.coord;
          temptemp = resultado.main;
          temploc = resultado.sys;
          let temparreglotemp = [];
          temparreglotemp.push(temptemp.temp);
          temparreglotemp.push(temptemp.temp_max);
          temparreglotemp.push(temptemp.temp_min);
          let temparreglocoord = [];
          temparreglocoord.push(tempcoord.lon);
          temparreglocoord.push(tempcoord.lat);
          let temparregloloc = [];
          temparregloloc.push(temploc.country)
          temparregloloc.push(resultado.name)         
          setLista(temparreglotemp);
          setTemp(temparregloloc);
          setLocation(temparreglocoord);
         }         
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{textAlign: "center", fontWeight: "bold",  fontSize: 30}}> Clima </Text>
      <SearchBar
        round
        containerStyle={{
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          borderBottomWidth: 0,
        }}
        inputStyle={{ backgroundColor: '#B1D5DC' }}
        onChangeText={(texto) => {
          setCiudad(texto)
          buscar(texto);
        }}
        onClear={() => {
          setLista([]);
          setCiudad("")
          setConsultado(false);
        }}
        value={ciudad}
        placeholder="Buscar ciudad"
      />

      <View style={{ margin: 10, fontSize: 20 }}>
        {
          consultado?
          <View style={{ margin: 10, fontSize: 20 }}>
            <Text style={styles.texto}> {temp[1]}, {temp[0]}{}</Text>
            <Text style={{textAlign: "center", fontWeight: "bold", fontSize: 23}}> Actual: {lista[0]} c°</Text>
            <Text style={{textAlign: "center", fontWeight: "bold",  fontSize: 23}}> Máxima: {lista[1]} c°</Text>
            <Text style={{textAlign: "center", fontWeight: "bold",  fontSize: 23}}> Mínima: {lista[2]} c°</Text>
            <Button 
                title="Pronsotico de la semana" 
                onPress={()=>navigation.navigate('DetailScreen',{nombre:temp[1],lon:location[0],lat:location[1]})}
            />
          </View>:
          <Text style={{textAlign: "center", fontSize: 23}}>Realiza una busqueda</Text>
        }
      </View>
    </View>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
});