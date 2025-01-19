import { FC, useCallback, useState } from "react"
import * as Application from "expo-application"
import DateTimePicker from "@react-native-community/datetimepicker"
import {
  Alert,
  LayoutAnimation,
  Platform,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
} from "react-native"
import { Button, ListItem, Screen, Text } from "../components"
import { TabScreenProps } from "../navigators/Navigator"
import type { ThemedStyle } from "@/theme"
import { $styles } from "../theme"
import { isRTL } from "../i18n"
import { useStores } from "../models"
import { useAppTheme } from "@/utils/useAppTheme"
import { signOut } from "firebase/auth"
import { api } from "../services/api"

const usingHermes = typeof HermesInternal === "object" && HermesInternal !== null

export const SettingsScreen: FC<TabScreenProps<"Settings">> = function SettingsScreen(
  _props,
) {
  const { setThemeContextOverride, themeContext, themed } = useAppTheme()
  const {
    authenticationStore: { logout },
  } = useStores()
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(api.auth);
      // Successfully logged out from Firebase Auth, now call logout from authenticationStore
      logout();
    } catch (error) {
      // Handle errors here, such as displaying an alert
      if (error instanceof Error) {
        Alert.alert("Logout failed", error.message);
      } else {
        Alert.alert("Logout failed", "An unknown error occurred");
      }
    }
  };

  const toggleTheme = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut) // Animate the transition
    setThemeContextOverride(themeContext === "dark" ? "light" : "dark")
  }, [themeContext, setThemeContextOverride])

  const onTimeChange = (event: any, selectedDate: Date | undefined) => {
    const currentTime = selectedDate || time;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  const onSubmit = async () => {
    if (api.auth.currentUser === null) {
      return;
    }
    try {
      await api.addTimesToDrinkCoffee(api.auth.currentUser?.uid, time);
      Alert.alert("Success", "Time to drink coffee updated successfully.");
    } catch (error) {
      console.error('Error updating time to drink coffee:', error);
      Alert.alert("Error", "Failed to update time to drink coffee.");
    }
  };

  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top"]}
      contentContainerStyle={[$styles.container, themed($container)]}
    >

      <Text style={themed($title)} preset="heading" tx="settingsScreen:title" />
      <View style={themed($buttonContainer)}>
        <Button style={themed($button)} onPress={toggleTheme} text={`Toggle Theme: ${themeContext}`} />
      </View>
      <View style={themed($buttonContainer)}>
        <Button style={themed($button)} tx="common:logOut" onPress={handleLogout} />
      </View>
      <Button style={themed($button)} text="Pick a time" onPress={() => setShowTimePicker(true)} />
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={onTimeChange}
          />
        )}
        <Button style={themed($button)} text="Submit" onPress={onSubmit} />
    </Screen>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingBottom: spacing.xxl,
})

const $title: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
  paddingHorizontal: spacing.lg,
})

const $itemsContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginVertical: spacing.xl,
})

const $button: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
   
  marginTop: spacing.md,
  marginRight: spacing.lg,
  marginLeft: spacing.lg,
  backgroundColor: colors.transparent,
})

const $buttonContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})