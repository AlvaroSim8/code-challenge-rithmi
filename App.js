import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  ActivityIndicator
} from "react-native";
import Constants from "expo-constants";
import format from 'date-fns/format';
import {es} from 'date-fns/locale';
import Logo from './src/components/logo.js';
import Item from './src/components/item.js';
import Chart from './src/components/chart.js'

const url = 'https://rithmi-frontend-test.s3-eu-west-1.amazonaws.com/samples.json';


export default class App extends React.Component{
 
  constructor(props){
    super(props);

    this.state = {
      datos:[],
      loading: true,
      error:false,
      datosChart: null
    }
  }

  componentDidMount(){
    this.getDatos();
  }

  getDatos = () => { 
    fetch(url)
    .then(res => res.json())
    .then(res =>{
      const dataOrdenado = res.sort((a, b) => (a.date > b.date ? 1 : -1)); 
      const dataAgrupado = {};
      const chartData = {
        labels: [],
        datasets: [
          {
            data: [], 
            color: () => `#cc5858`,
            strokeWidth: 1
          }
        ],
      };
      const dataLength = dataOrdenado.length - 1;

      for (let index = 0; index < dataOrdenado.length; index++) {
        const medida = dataOrdenado[index];
        const dia = medida.date.split('T')[0];
        if (!dataAgrupado[dia]) {
          dataAgrupado[dia] = [];
        }
        dataAgrupado[dia].push(medida);
        const reverse =  dataOrdenado[dataLength - index];
        chartData.labels.push(format(new Date(reverse.date), 'd/p', {locale: es}));
        chartData.datasets[0].data.push(reverse.heartRate)
      }

      const dataFinal = Object.entries(dataAgrupado).map((data) => {
        return {
          title: data[0],
          data: data[1],
        };
      });
      this.setState({
        datos: dataFinal,
        datosChart: chartData
      })
      setTimeout(() => {this.setState({loading: false})}, 2000);
    })
    .catch((error)=> {
      this.setState({
        loading:false,
        error:true
      })
    });
  }

  render(){
    if(this.state.loading || this.state.error){
      return(
      <View>
        <Logo style={styles.logoWelcome}></Logo>
        <Text style={styles.welcome}>Bienvenido a</Text>
        <Text style={styles.name}>Rithmi</Text>
        {this.state.error ?
        <Text style={styles.name}>Hubo un error al cargar la aplicación</Text> :
        <ActivityIndicator size="large" color="#00e8c8" />
        }
      </View>
      )
    }

    return ( 
      <SafeAreaView style={styles.container}>       
      <Logo style={styles.logo}></Logo>
      {this.state.datosChart &&
        <Chart data = {this.state.datosChart}></Chart> 
      }
      <SectionList
        sections={this.state.datos}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Item item={item} />}
        renderSectionHeader={({ section: { title } }) => (
        <Text 
        style={styles.header}>
          {format(new Date(title), 'EEEE PPP', {locale: es})}
          </Text>
        )}
      />
    </SafeAreaView>
    )
  }
}

//--------Styles---------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
  },
  header: {
    fontSize: 30,
    backgroundColor: "#fff",
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
  logo: {
    width:60,
    height:40,
    marginBottom:10,
  },
  ppm: {
    fontSize: 24,
    color:"#00e8c8",
    fontWeight:"bold",
  },
  welcome:{
    marginTop:60,
    fontSize: 34,
    color:"#00bbc8",
    fontWeight:"bold",
    textAlign:'center'
  },
  name:{
    marginBottom:80,
    fontSize: 54,
    color:"#00bbc8",
    fontWeight:"bold",
    textAlign:'center',
  },
  logoWelcome:{
    marginTop:100,
    width:150,
    height:100,
    marginLeft:130
  },
  error:{
    color: 'red',
    fontSize: 18,
    borderWidth: 2,
    borderColor: "red",
    borderRadius: 4,
    padding:5,
    textAlign:'center',
    marginHorizontal:20
  }
});