import { View, Text, Button, StyleSheet, TextInput, TouchableWithoutFeedback } from "react-native"
import React, { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"
import { styles, toastConfig } from "../../../style"
import Toast from "react-native-toast-message"
import Checkbox from "expo-checkbox"
import { useRegisterUserMutation } from "../../../services/userAuthApi"
import { storeToken } from "../../../services/AsyncStorageService"
import MaterialCommunityIcons from '@expo/vector-icons';

import Background from "../../../features/Background"
// import Logo from "../../../features/logo"
import BackButton from "../../../features/BackButton"
// import { Card } from "react-native-paper"
import { TouchableOpacity } from "react-native-gesture-handler"

const RegistrationScreen = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password_confirmation, setPassword_confirmation] = useState("")
  const [tc, setTc] = useState(false)

  const clearTextInput = () => {
    setName("")
    setEmail("")
    setPassword("")
    setPassword_confirmation("")
    setTc(false)
  }
  const navigation = useNavigation()

  const [registerUser] = useRegisterUserMutation()

  const handleFormSubmit = async () => {
    if (name && email && password && password_confirmation && tc) {
      if (password === password_confirmation) {
        const formData = { name, email, password, password_confirmation, tc }
        const res = await registerUser(formData)
        if (res.data.status === "success") {
          await storeToken(res.data.token) // Store Token in Storage
          clearTextInput()
          navigation.navigate("Instructions")
        }
        if (res.data.status === "failed") {
          Toast.show({
            type: "warning",
            position: "top",
            topOffset: 0,
            text1: res.data.message,
          })
        }
      } else {
        Toast.show({
          type: "warning",
          position: "top",
          topOffset: 0,
          text1: "Password and Confirm Password doesn't match",
        })
      }
    } else {
      Toast.show({
        type: "warning",
        position: "top",
        topOffset: 0,
        text1: "All fields are Required",
      })
    }
  }
  const[show,setShow]=React.useState(false);
  const[visible,setVisible]=React.useState(true);

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      {/* <Logo /> */}
      <SafeAreaView>
       
        
              <View style={{ marginHorizontal: 30, marginTop: 150}}>
               <Toast config={toastConfig} />
                <View style={styles.inputWithLabel}>
                  <Text style={styles.labelText}>Name</Text>
                  <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Write Your Name" />
                </View>
                <View style={[styles.inputWithLabel, { marginBottom: 10 }]}>
                  <Text style={styles.labelText}>Email</Text>
                  <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Write Your Email" keyboardType="email-address" />
                </View>
                <View style={styles.inputWithLabel}>
                  <Text style={styles.labelText}>Password</Text>
                  <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Write Your Password" secureTextEntry={visible} />
                  </View>
                                
                <View style={styles.inputWithLabel}>
                  <Text style={styles.labelText}>Confirm Password</Text>
                  <TextInput style={styles.input} value={password_confirmation} onChangeText={setPassword_confirmation} placeholder="Write Your Confirm Password" secureTextEntry={visible} />
                  </View>
                             
                <View style={{ flex: 1, flexDirection: "row", fontWeight: "bold" }}>
                  <Checkbox value={tc} onValueChange={setTc} color={tc ? "black" : undefined} />
                  <Text style={styles.labelText}>I agree to term and condition.</Text>
                </View>
                <View style={{ width: 200, alignSelf: "center", marginBottom: 5 }}>
                <Button title='JOIN' fontWeight='bold' onPress={handleFormSubmit}color='#F8772E'/>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      navigation.navigate("UserLogin")
                    }}
                  >
                    <Text style={{ fontWeight: "bold", alignSelf: "center", marginBottom: 55 }}>Already Registered ? Login</Text>
                    
                  </TouchableWithoutFeedback>
                </View>
              </View>
     
      </SafeAreaView>
    </Background>
  )
}

export default RegistrationScreen

// import React, { useState } from "react"
// import { TouchableOpacity, StyleSheet, View } from "react-native"
// import { Text } from "react-native-paper"
// import Background from "../../../features/Background"
// //import Logo from '../components/Logo'
// import Header from "../../../features/Header"
// import Button from "../../../features/Button"
// import TextInput from '../../../features/TextInput'
// import BackButton from '../../../features/BackButton'
// import { theme } from '../../../core/theme'
// import { emailValidator } from "./helpers/emailvalidator"
// import { passwordValidator } from "./helpers/passvalidator"
// import { nameValidator } from './helpers/namevalidator'

// export default function Registration({ navigation }) {
//   const [name, setName] = useState({ value: '', error: '' })
//   const [email, setEmail] = useState({ value: '', error: '' })
//   const [password, setPassword] = useState({ value: '', error: '' })

//   const onSignUpPressed = () => {
//     const nameError = nameValidator(name.value)
//     const emailError = emailValidator(email.value)
//     const passwordError = passwordValidator(password.value)
//     if (emailError || passwordError || nameError) {
//       setName({ ...name, error: nameError })
//       setEmail({ ...email, error: emailError })
//       setPassword({ ...password, error: passwordError })
//       return
//     }
//     navigation.reset({
//       index: 0,
//       routes: [{ name: 'Instructions' }],
//     })
//   }

//   return (
//     <Background>
//       <BackButton goBack={navigation.goBack} />
//       {/* <Logo /> */}
//       <Header>Create Account</Header>
//       <View style={styles.container}>
//       <TextInput
//         label="Name"
//         returnKeyType="next"
//         value={name.value}
//         onChangeText={(text) => setName({ value: text, error: '' })}
//         error={!!name.error}
//         errorText={name.error}
//       />
//       <TextInput
//         label="Email"
//         returnKeyType="next"
//         value={email.value}
//         onChangeText={(text) => setEmail({ value: text, error: '' })}
//         error={!!email.error}
//         errorText={email.error}
//         autoCapitalize="none"
//         autoCompleteType="email"
//         textContentType="emailAddress"
//         keyboardType="email-address"
//       />
//       <TextInput
//         label="Password"
//         returnKeyType="done"
//         value={password.value}
//         onChangeText={(text) => setPassword({ value: text, error: '' })}
//         error={!!password.error}
//         errorText={password.error}
//         secureTextEntry
//       />
//       <Button
//         mode="contained"
//         onPress={onSignUpPressed}
//         style={{ marginTop: 24 }}
//         color='#F8772E'
//       >
//         Sign Up
//       </Button>
//       <View style={styles.row}>
//         <Text>Already have an account? </Text>
//         <TouchableOpacity onPress={() => navigation.replace('UserLogin')}>
//           <Text style={styles.link}>Login</Text>
//         </TouchableOpacity>
//       </View>
//       </View>
//     </Background>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     fontFamily: 'Segoe UI',
//     fontSize: 55,
//     padding: 8,
//     width: 280,
//     backgroundColor: '#fff',
//     margin: 15,
//     marginLeft: -50,
//     marginRight: -50,
//     marginTop: 130,
//     boxShadow: '5px 5px 3px #febe09',
//     textAlign: 'center'
//     },
//   row: {
//     flexDirection: 'row',
//     marginTop: 4,
//   },
//   link: {
//     fontWeight: 'bold',
//     color: theme.colors.primary,
//   },
// })
