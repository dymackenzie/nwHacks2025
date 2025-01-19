import { FC, useState } from "react"
import { Image, ImageStyle, TextStyle, ViewStyle, Alert } from "react-native"
import { Button, TextField, Screen, Icon, Text } from "../components"
import { TabScreenProps } from "../navigators/Navigator"
import { $styles } from "../theme"
import type { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { add } from "date-fns"

const coffee_button = require("../../assets/images/more_coffee.png")

const $transparentButton: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  backgroundColor: colors.transparent,
  borderColor: colors.transparent,
  marginBottom: spacing.xxxl,
})

const $customLabelAndHelperStyle: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.text,
  marginTop: spacing.sm,
})

const $iconStyle: ImageStyle = { width: 300, height: 300 }

export const CoffeeScreen: FC<TabScreenProps<"CoffeeScreen">> =
  function CoffeeScreen(_props) {
    const [coffee, setCoffee] = useState<string>()
    const { themed } = useAppTheme()

    const submit = () => {
      var regExp = /[a-zA-Z]/g;
      if (coffee && regExp.test(coffee.toString())) {
        Alert.alert("Please enter a valid number");
        return;
      }
      if (coffee && parseInt(coffee)) {
        var coffeeInt = parseInt(coffee);
        // api.addCoffee(coffeeInt);
      }
    }

    const onCoffeePressed = () => {

    }

    return (
      <Screen preset="scroll" contentContainerStyle={$styles.container} safeAreaEdges={["top"]}>
        <Text tx="coffee:title" style={themed($title)} />
        <Button preset="default" style={themed($transparentButton)} onPress={onCoffeePressed}>
                <Image source={coffee_button} style={themed($iconStyle)} />
        </Button>
        <TextField
        value={coffee}
        onChangeText={setCoffee} 
        labelTx="coffee:coffeePromptLabel"
        placeholderTx="coffee:coffeePrompt"
        style={themed($customLabelAndHelperStyle)} 
        />
        <Button
        style={themed($submit)}
          preset="reversed"
          tx="coffee:submit"
          onPress={submit}
        />
      </Screen>
    )
  }

const $title: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
  fontSize: 30,
  lineHeight: 40,
})

const $tagline: ThemedStyle<TextStyle> = ({ spacing }) => ({
  // marginBottom: spacing.xxl,
})

const $submit: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginVertical: spacing.lg,
})

const $sectionTitle: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginTop: spacing.xxl,
})

const $logoContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginEnd: spacing.md,
  flexWrap: "wrap",
  alignContent: "center",
  alignSelf: "stretch",
})

const $logo: ImageStyle = {
  height: 38,
  width: 38,
}
