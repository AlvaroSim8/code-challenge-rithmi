import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  SectionList
} from "react-native";
import Constants from "expo-constants";
import format from 'date-fns/format';
import {es} from 'date-fns/locale';


const Logo = ()=>(
 <Image style={styles.logo} source={require('./src/img/ri.png')}></Image>
)

const Item = ({ item }) => (

  <View style={styles.item}>
    <Text style={styles.title}>{format(new Date(item.date), 'p',{locale: es})}</Text>
    <Text style={styles.ppm}>{item.heartRate} ppm</Text>
    <Text style={styles.title}>{item.hasAnomaly 
    ? <Image style={styles.arritmia} source={require('./src/img/es.jpg')}></Image> : <Image style={styles.image} source={require('./src/img/cora.png')}></Image> }</Text>
  </View>
);

export default class App extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      datos:[],
      loading: false,
      url: 'https://rithmi-frontend-test.s3-eu-west-1.amazonaws.com/samples.json'
    }
  }

  componentDidMount(){
    this.getDatos();
  }

  render(){
    if(this.state.loading){
      return(
      <View style={styles.item}>
        <Text style={styles.title}>Cargando</Text>
      </View>
      )
    }

    return (
      <SafeAreaView style={styles.container}>
      <Logo></Logo>
      {this.state.loading ?   <View style={styles.item}>
        <Text style={styles.title}>Cargando</Text>
      </View> : <SectionList
        sections={this.state.datos}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Item item={item} />}
        renderSectionHeader={({ section: { title } }) => (
        <Text 
        style={styles.header}>
          {format(new Date(title), 'EEEE PPP', {locale: es})}
          </Text>
        )}
      />}
    </SafeAreaView>
    )
  }

  getDatos = () => {
    this.setState({loading:true})
    fetch(this.state.url)
    .then(res => res.json())
    .then(res =>{
      const dataOrdenado = res.sort((a, b) => (a.date > b.date ? 1 : -1));
      const dataAgrupado = {};

      for (let index = 0; index < dataOrdenado.length; index++) {
        const medida = dataOrdenado[index];
        const dia = medida.date.split('T')[0];
        if (!dataAgrupado[dia]) {
          dataAgrupado[dia] = [];
        }
        dataAgrupado[dia].push(medida);
      }

      const dataFinal = Object.entries(dataAgrupado).map((data) => {
        return {
          title: data[0],
          data: data[1],
        };
      });
      this.setState({
        datos: dataFinal,
        loading:false,
      })
    })
  }
}


//--------Styles---------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
  },
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
    marginVertical:1
  },
  arritmia: {
    width:40,
    height:30,
    marginVertical:1
  },
  logo: {
    width:60,
    height:40,
    marginBottom:10
  },
  ppm: {
    fontSize: 24,
    color:"#00e8c8",
    fontWeight:"bold"
  }
});