import { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { ListItem, Screen, Text } from "../components"
import { TabScreenProps } from "../navigators/Navigator"
import { $styles } from "../theme"
import { openLinkInBrowser } from "../utils/openLinkInBrowser"
import { isRTL } from "../i18n"
import type { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"

const chainReactLogo = require("../../assets/images/demo/cr-logo.png")
const reactNativeLiveLogo = require("../../assets/images/demo/rnl-logo.png")
const reactNativeRadioLogo = require("../../assets/images/demo/rnr-logo.png")
const reactNativeNewsletterLogo = require("../../assets/images/demo/rnn-logo.png")

export const StatsScreen: FC<TabScreenProps<"Stats">> =
  function StatsScreen(_props) {
    const { themed } = useAppTheme()
    return (
      <Screen preset="scroll" contentContainerStyle={$styles.container} safeAreaEdges={["top"]}>
        <Text preset="heading" tx="statsScreen:title" style={themed($title)} />
        
      </Screen>
    )
  }

const $title: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $tagline: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.xxl,
})

const $description: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
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
