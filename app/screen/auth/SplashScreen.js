import React from "react"
import Animated from 'react-native-reanimated';
import { Text } from "react-native-paper"
import SplashBG from "../../../features/SplashBG"
import Bg from "../../../features/Bg"
import Button from "../../../features/Button"
import { Dimensions } from "react-native"
const { width, height } = Dimensions.get("window")
import { StatusBar, View } from "react-native"

export const COLORS = {
  primary: "#F8772E",
  secondary: "#F8772E",
  accent: "#F8772E",
  black: "#171717",
}

export default function SplashScreen({ navigation }) {
  return (
    <SplashBG>
      <Text style={{ color: COLORS.black, fontSize: 15, opacity: 1, marginRight: 10, marginTop: 490 }}> Its helluva start, Lets hunt the game</Text>
      <Button mode="contained" onPress={() => navigation.navigate("StartScreen")} color='#F8772E'>
        Start
      </Button>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
        <View
          style={{
            flex: 1,
            paddingVertical: 94,
            paddingHorizontal: 2,
            backgroundColor: COLORS.background,
            position: "relative",
          }}>
          </View>
     </SplashBG>
  )
}
