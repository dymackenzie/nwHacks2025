import React from "react"
import { View, Text, StyleSheet, Image, ImageSourcePropType } from "react-native"
import { LineChart } from "react-native-chart-kit"
import { colors, spacing } from "../theme"
import { FontDisplay } from "expo-font"

interface CafeStatsCardProps {
  title: string
  stats: string
  graphData: {
    labels: string[]
    datasets: { data: number[] }[]
  } | null
  image: ImageSourcePropType
  money: number | null
}

export const CafeStatsCard: React.FC<CafeStatsCardProps> = ({ title, stats, graphData, image, money }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={image} style={styles.icon} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.stats}>{stats}</Text>
      {graphData && (
        <LineChart
          data={graphData}
          width={240}
          height={240}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      )}
      {money && <Text style={styles.money}>{money}</Text>}
      
    </View>
  )
}

const chartConfig = {
  backgroundGradientFrom: colors.transparent,
  backgroundGradientTo: colors.transparent,
  backgroundGradientFromOpacity: 1,
  color: (opacity = 1) => `rgba(193, 219, 212, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: colors.palette.primary500,
  },
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: spacing.md,
    margin: spacing.md,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: spacing.sm,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
  },
  stats: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.textDim,
    marginBottom: spacing.md,
  },
  chart: {
    marginVertical: spacing.md,
  },
  money: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.error,
    textAlign: "right",
    marginTop: spacing.md,
  }
})
