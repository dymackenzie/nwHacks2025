import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import { Settings, TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon } from "../components"
import { translate } from "../i18n"
import { SettingsScreen } from "../screens"
import { CoffeeScreen } from "../screens/CoffeeScreen"
import type { ThemedStyle } from "@/theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { useAppTheme } from "@/utils/useAppTheme"
import { StatsScreen } from "@/screens/StatsScreen"
import { BigRedButtonScreen as BigButtonScreen } from "@/screens/BigButtonScreen"
import { NotificationsDemoScreen } from "@/screens/NotificationsDemo"

export type TabParamList = {
  // DemoCommunity: undefined
  // DemoShowroom: { queryIndex?: string; itemIndex?: string }
  // DemoDebug: undefined
  // DemoPodcastList: undefined
  // BigButton: undefined
  Settings: undefined
  CoffeeScreen: undefined
  Stats: undefined
  // NotificationsDemo: undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 */
export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<TabParamList>()

/**
 * This is the main navigator for the screens with a bottom tab bar.
 * Each tab is a stack navigator with its own set of screens.
 * 
 * @returns {JSX.Element} The rendered `Navigator`.
 */
export function Navigator() {
  const { bottom } = useSafeAreaInsets()
  const {
    themed,
    theme: { colors },
  } = useAppTheme()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: themed([$tabBar, { height: bottom + 70 }]),
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: themed($tabBarLabel),
        tabBarItemStyle: themed($tabBarItem),
      }}
    >

    <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          tabBarLabel: "Stats",
          tabBarIcon: ({ focused }) => (
            <Icon icon="stats" color={focused ? colors.tint : colors.tintInactive} size={25} />
          ),
        }}
      />

      <Tab.Screen
        name="CoffeeScreen"
        component={CoffeeScreen}
        options={{
          tabBarLabel: "Coffee",
          tabBarIcon: ({ focused }) => (
            <Icon icon="coffee" color={focused ? colors.tint : colors.tintInactive} size={25} />
          ),
        }}
      />

      {/* <Tab.Screen
        name="BigButton"
        component={BigButtonScreen}
        options={{
          tabBarAccessibilityLabel: translate("Navigator:buttonTab"),
          tabBarLabel: translate("Navigator:buttonTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="clap" color={focused ? colors.tint : colors.tintInactive} size={30} />
          ),
        }}
      /> */}

      {/* <Tab.Screen
        name="NotificationsDemo"
        component={NotificationsDemoScreen}
        options={{
          tabBarAccessibilityLabel: translate("Navigator:buttonTab"),
          tabBarLabel: translate("Navigator:buttonTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="clap" color={focused ? colors.tint : colors.tintInactive} size={30} />
          ),
        }}
      /> */}

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ focused }) => (
            <Icon icon="settings" color={focused ? colors.tint : colors.tintInactive} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
  marginBottom: spacing.sm
})

const $tabBarItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingTop: spacing.md,
})

const $tabBarLabel: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  color: colors.text,
})
