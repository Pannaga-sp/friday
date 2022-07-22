// import React from "react" ;
// import{ 
//     View,
//     Text,
//     Platform,
//     StyleSheet ,
//     NativeModules
// } from "react-native";
// import Animated from 'react-native-reanimated';
// const { UIManager } = NativeModules;
// // import Header from "../../features/Header.js";
// import Button from "../../features/Button.js";
// import Constants from 'expo-constants';
// // import SideBar from './app/screen/SideBar.js'
// // import Bg from "../../features/Background"

// export default function DashboardScreen({ navigation }){
// return (  
//   // <Bg>
//           <View style={styles.container}>
//           <Button
//           mode="contained"
//           color="#F8772E"
//           onPress={() =>
//             navigation.reset({
//               index: 0,
//               routes: [{ name: "Quiz1" }],
//             })
//           }
//         >
//           Quiz
//         </Button>
//         <Button
//                  mode="contained"
//                  color="#F8772E"
//                  onPress={() =>
//                    navigation.reset({
//                      index: 0,
//                      routes: [{ name: "upload" }],
//                    })
//                  }
//                >
//                  Upload 
//                </Button>
//               <Button
//                     mode="contained"
//                     color="#F8772E"
//                     onPress={() =>
//                       navigation.reset({
//                         index: 0,
//                         routes: [{ name: "qrcodee" }],
//                       })
//                     }
//                   >
//                     QR
//                   </Button>
//                   </View>
//                   // </Bg>
//         )
//     }
// const styles = StyleSheet.create({
//     container:{
//         flex:1,
//         marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
//         marginTop: 222,
//     },
// })


import { View, Text, StyleSheet, Platform, NativeModules } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Button from '../../features/Button';
import React, { useEffect, useState } from 'react'
const { UIManager } = NativeModules;
import { getToken } from '../../services/AsyncStorageService'
import { useGetLoggedUserQuery } from '../../services/userAuthApi'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '../../features/userSlice'
import { setUserToken } from '../../features/authSlice'
import Constants from 'expo-constants';
// import Quiz1 from './auth/Quiz1'
const DashboardScreen = () => {
  const [userLToken, setUserLToken] = useState()

  useEffect(() => {
    (async () => {
      const token = await getToken() // Getting Token from Storage
      setUserLToken(token)          // Store Token in Local State
      dispatch(setUserToken({ token: token })) // Store Token in Redux Store
    })();
  })

  const { data, isSuccess } = useGetLoggedUserQuery(userLToken)

  // Store User Data in Redux Store
  const dispatch = useDispatch()
  useEffect(() => {
    if (isSuccess) {
      dispatch(setUserInfo({ email: data.user.email, name: data.user.name }))
    }
  })
  const handleLogout = async () => {
    navigation.navigate('Quiz1');
  }
  const upload1 = async () => {
    navigation.navigate('upload');
    }
    const qr = async () => {
    navigation.navigate('qrcodee');
    }
  const navigation = useNavigation()
  return (
     <View style={styles.container}>
 <Button mode="contained"  color="#F8772E" onPress={handleLogout}>
      Quiz
      </Button>
      <Button mode="contained"  color="#F8772E" onPress={upload1}>
      Upload Image
      </Button>
      <Button mode="contained"  color="#F8772E" onPress={qr}>
      QR Scan
      </Button>
    </View>
   
  );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
        marginTop: 222,
    },
})

export default DashboardScreen


