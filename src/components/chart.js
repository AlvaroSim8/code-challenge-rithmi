import React from "react";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";

  const chartConfig = {
    color: (opacity = 1) => `#00bbc8`,
    strokeWidth: 2 // optional, default 3
  }
  const screenWidth = Dimensions.get("window").width;

  const Chart =(props)=>(
    <ScrollView horizontal style={styles.scroll}>
  <LineChart
  data={props.data}
  height={180}
  width={8200}
  chartConfig={chartConfig}
/>
  </ScrollView>
  )

  const styles = StyleSheet.create({
    scroll:{
      height:260
    }
  })

  export default Chart;

