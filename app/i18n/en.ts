import { de } from "date-fns/locale"
import demoEn from "./demo-en"

const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
    logOut: "Log Out",
  },
  welcomeScreen: {
    postscript:
      "psst  — imagine a life without coffee. No more stained teeth, no more jitters, no more dependency. You can do it!",
    tagline: "Ready to beat your coffee addiction?",
    exciting: "(shh, don't be scared!)",
    letsGo: "I'm ready!",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
    traceTitle: "Error from %{name} stack",
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
  errors: {
    invalidEmail: "Invalid email address.",
  },
  loginScreen: {
    logIn: "Log In",
    enterDetails:
      "Breaking coffee addictions one app at a time!",
    emailFieldLabel: "Email",
    passwordFieldLabel: "Password",
    emailFieldPlaceholder: "Enter your email address",
    passwordFieldPlaceholder: "Enter your password",
    tapToLogIn: "Tap to log in!",
  },
  signUpScreen: {
    signIn: "Sign In",
    enterDetails:
      "Let's do less latte!",
    emailFieldLabel: "Email",
    nameFieldLabel: "Name",
    passwordFieldLabel: "Password",
    emailFieldPlaceholder: "Enter your email address",
    nameFieldPlaceholder: "Enter your name",
    passwordFieldPlaceholder: "Enter your password",
    tapToSignIn: "Tap to sign in!",
  },
  Navigator: {
    componentsTab: "Components",
    debugTab: "Debug",
    communityTab: "Community",
    podcastListTab: "Podcast",
    buttonTab: "Button"
  },
  statsScreen: {
    title: "Let's see how you're doing!",
    description: "One day? Or day one? You decide!",
  },
  settingsScreen: {
    title: "Settings",
  },
  coffee: {
    title: "Coffee? Press To Start Your Machine",
    description: "Press Coffee Cup",
    coffeePromptLabel: "External Sources",
    coffeePrompt: "Input cups of coffee bought today",
    submit: "Submit",
  },

  ...demoEn,
}

export default en
export type Translations = typeof en
