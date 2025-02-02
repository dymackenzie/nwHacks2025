import { observer } from "mobx-react-lite"
import React, { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
import { Alert, TextInput, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { api } from "../services/api";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"
import { useNavigation } from "@react-navigation/native"

interface SignUpScreenProps extends AppStackScreenProps<"SignUp"> { }

export const SignUpScreen: FC<SignUpScreenProps> = observer(function SignUpScreen() {

  const navigation = useNavigation<AppStackScreenProps<"SignUp">["navigation"]>()

  const goToLogin = () => {
    navigation.navigate('Login');
  }

  const onHandleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(api.auth, email, password);
      const user = userCredential.user;
      const userRef = doc(api.database, "users", user.uid);
      await setDoc(userRef, {
        guid: user.uid,
        name: name,
        email: email,
        timesToDrinkCoffee: [],
        coffeeHistory: {},
        externalCoffeeHistory: {},
      });
      
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      } else {
        Alert.alert('An unknown error occurred');
      }
    }
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageURL, setImageURL] = useState("");


  const [authPassword, setAuthPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    authenticationStore: { authEmail, setAuthEmail, setAuthToken, validationError },
  } = useStores()

  useEffect(() => {
    // Here is where you could fetch credentials from keychain or storage
    // and pre-fill the form fields.
    setAuthEmail("ignite@infinite.red")
    setAuthPassword("ign1teIsAwes0m3")

    // Return a "cleanup" function that React will run when the component unmounts
    return () => {
      setAuthPassword("")
      setAuthEmail("")
    }
  }, [])




  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text testID="login-heading" tx="signUpScreen:signIn" preset="heading" style={$signIn} />
      <Text tx="signUpScreen:enterDetails" preset="subheading" style={$enterDetails} />

      <TextField
        value={name}
        onChangeText={setName}
        containerStyle={$textField}
        autoCapitalize="none"
        autoCorrect={false}
        labelTx="signUpScreen:nameFieldLabel"
        placeholderTx="signUpScreen:nameFieldPlaceholder"

      />

      <TextField
        value={email}
        onChangeText={setEmail}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="signUpScreen:emailFieldLabel"
        placeholderTx="signUpScreen:emailFieldPlaceholder"
      />

      <TextField
        value={password}
        onChangeText={setPassword}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthPasswordHidden}
        labelTx="signUpScreen:passwordFieldLabel"
        placeholderTx="signUpScreen:passwordFieldPlaceholder"

      />



      <Button
        testID="login-button"
        tx="signUpScreen:tapToSignIn"
        style={$tapButton}
        preset="reversed"
        onPress={onHandleSignup}
      />

      <TouchableOpacity style={$loginButton} onPress={goToLogin}>
        <Text>Have an account? Login</Text>
      </TouchableOpacity>

    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $signIn: TextStyle = {
  marginBottom: spacing.sm,
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.lg,
}

const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.md,
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
}

const $loginButton: ViewStyle = {
  marginTop: spacing.xs,
  alignItems: 'center',
  padding: 10,
}