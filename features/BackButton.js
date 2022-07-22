import React from "react"
import { TouchableOpacity, Image, StyleSheet } from "react-native"
import { getStatusBarHeight } from "react-native-status-bar-height"

export default function BackButton({ goBack }) {
  return (
    <TouchableOpacity onPress={goBack} style={styles.container}>
      <Image style={styles.image} source={require("../assets/back.png")} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 20 + getStatusBarHeight(),
    left: 10,
  },
  image: {
    width: 50,
    height: 50,
    paddingTop: 10,
  },
})
