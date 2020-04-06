import React from "react";
import {
  Image,
  StyleSheet
} from "react-native";

const Logo = (props)=>(
    <Image style={props.style || styles.logo} source={require('../img/rithmi.png')}></Image>
   )

   
   const styles = StyleSheet.create({
        logo: {
            width:60,
            height:40,
            marginBottom:10,
        }
    });
    export default Logo;