import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet
} from "react-native";
import format from 'date-fns/format';
import {es} from 'date-fns/locale';

const Item = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{format(new Date(item.date), 'p',{locale: es})}</Text>
      <Text style={styles.ppm}>{item.heartRate} ppm</Text>
      <Text style={styles.title}>{item.hasAnomaly 
      ? <Image style={styles.image} source={require('../img/cora.png')}></Image> 
      : <Image style={styles.arrhythmia} source={require('../img/es.jpg')}></Image>}
      </Text>
    </View>
  );


  const styles = StyleSheet.create({
    item: {
      padding: 10,
      marginVertical: 8,
      borderWidth: 2,
      borderColor: "#00bcc8",
      borderRadius: 16,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 24,
      color:"#00bbc8",
      fontWeight:"bold"
    },
    image: {
      width:30,
      height:25,
      marginVertical:2
    },
    arrhythmia: {
      width:40,
      height:30,
      marginVertical:1
    },
    ppm: {
      fontSize: 24,
      color:"#00e8c8",
      fontWeight:"bold"
    },
  });
  
  export default Item;