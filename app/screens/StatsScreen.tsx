import { FC, useEffect, useState } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { CafeStatsCard, Screen, Text } from "../components"
import { TabScreenProps } from "../navigators/Navigator"
import { $styles } from "../theme"
import type { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { User } from "@/models/User"
import { api } from "@/services/api"
import { UserModel } from "@/models/User"

const history_icon = require("../../assets/icons/project/history.png")
const coins_icon = require("../../assets/icons/project/coins.png")
const trend_icon = require("../../assets/icons/project/trend.png")

export const StatsScreen: FC<TabScreenProps<"Stats">> =
  function StatsScreen(_props) {
    const { themed } = useAppTheme()
    const [user, setUser] = useState<User | null>(null);
    const [history, setHistory] = useState<number[]>([]);
    const [money, setMoney] = useState<number | null>(null);

    useEffect(() => {
      const fetchUser = async () => {
        if (api.auth.currentUser === null) {
          return;
        }
        try {
          const userData = await api.getUser(api.auth.currentUser.uid);
          const userInstance = UserModel.create(userData);
          setUser(userInstance);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchUser();
      calculateHistory();
      getMoney();
    }, [api.auth.currentUser ? api.auth.currentUser.uid : null]);

    const calculateHistory = () => {
      if (user === null) {
        return;
      }
      const historyArray = user.coffeeHistoryArray;
      if (historyArray.length > 7) {
        setHistory(historyArray.slice(0, 6));
        return;
      }
      setHistory(historyArray);
    }

    const getMoney = () => {
      if (user === null) {
        return;
      }
      setMoney(user.moneySpent);
    }

    return (
      <Screen preset="scroll" contentContainerStyle={$styles.container} safeAreaEdges={["top"]}>
        <Text preset="heading" tx="statsScreen:title" style={themed($title)} />
        
        <CafeStatsCard title="History" stats="Track your coffee intake over the past week!" graphData={{ labels: [], datasets: [{ data: history }] }} image={history_icon} money={null}/>
        <CafeStatsCard title="Money" stats="Tsk tsk... how much money you spent." graphData={null} image={coins_icon} money={money}/>
        <CafeStatsCard title="Trend" stats="Longest streak without drinking coffee!" graphData={null} image={trend_icon} money={null} />

      </Screen>
    )
  }

const $title: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
  paddingHorizontal: spacing.md,
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
