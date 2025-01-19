/**
 * Primary navigation file.
 * Contains an auth flow and a "main" flow which the user will use once logged in.
 */
import React, { useEffect, useRef } from "react"
import { NavigationContainer, NavigatorScreenParams } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import * as Screens from "@/screens"
import Config from "../config"
import { useStores } from "../models"
import { Navigator, TabParamList } from "./Navigator"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { useAppTheme, useThemeProvider } from "@/utils/useAppTheme"
import { ComponentProps } from "react"
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from "@/screens/NotificationsDemo"

export type AppStackParamList = {
  Welcome: undefined
  Login: undefined
  Main: NavigatorScreenParams<TabParamList>
  SignUp: undefined
  // extra screens can go here
}

// for android
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  const {
    authenticationStore: { isAuthenticated },
  } = useStores()

  const {
    theme: { colors },
  } = useAppTheme()

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: colors.background,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
      initialRouteName={isAuthenticated ? "Welcome" : "Login"}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Welcome" component={Screens.WelcomeScreen} />

          <Stack.Screen name="Main" component={Navigator} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Screens.LoginScreen} />
        </>
      )}

      {<>
        <Stack.Screen name="SignUp" component={Screens.SignUpScreen} />
      </>}
    </Stack.Navigator>
  )
})

export interface NavigationProps extends Partial<ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const { themeScheme, navigationTheme, setThemeContextOverride, ThemeProvider } =
    useThemeProvider()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  const responseListener = useRef<any>()

  useEffect(() => {
    // Handle notification tap
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response: any) => {
      // console.log("Notification Response:", JSON.stringify(response, null, 2));
  const data = response?.notification?.request?.content?.data;
  // console.log("Notification Data:", data);
  console.log("Screen:", data.screen);
      if (navigationRef.isReady() && data?.screen) {
        console.log("navigating to ", data.screen);
        navigationRef.navigate(data.screen || {})//, data.params
      }
    })

    // Clean up on unmount
    return () => {
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current)
      }
    }
  }, [])

  // useEffect(() => {
  //   registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  
  //   notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
  //     setNotification(notification);
  //   });
  
  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  //     console.log(response);
  //   });
  
  //   return () => {
  //     Notifications.removeNotificationSubscription(notificationListener.current);
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);

  return (
    <ThemeProvider value={{ themeScheme, setThemeContextOverride }}>
      <NavigationContainer ref={navigationRef} theme={navigationTheme} {...props}>
        <AppStack />
      </NavigationContainer>
    </ThemeProvider>
  )
})
