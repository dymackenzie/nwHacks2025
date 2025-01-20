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
  // graphData ? graphData.datasets = [{data: [1, 2, 3, 4]}] : null;
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={image} style={styles.icon} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.stats}>{stats}</Text>
      {(graphData && graphData.labels && graphData.datasets && graphData.datasets.length > 0 && graphData.datasets[0].data.length > 0) && (
        <LineChart
          data={graphData}
          width={240}
          height={240}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      )}
      {money && <Text style={styles.money}>{"$" + money}</Text>}
      
    </View>
  )
}

const chartConfig = {
  backgroundGradientFrom: "#f5f7fa",  // Light gradient background
  backgroundGradientTo: "#e1e8f0",    // Slightly darker gradient for contrast
  backgroundGradientFromOpacity: 0,  // Semi-transparent gradient
  backgroundGradientToOpacity: 0,    // Semi-transparent gradient
  color: (opacity = 1) => `rgba(78, 123, 233, ${opacity})`,  // Soft blue color for graph lines
  labelColor: (opacity = 1) => `rgba(54, 54, 54, ${opacity})`,  // Darker color for labels
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: 6,  // Dots size
    strokeWidth: 3,  // Border width of dots for a cleaner look
    stroke: "#4e7bef",  // Border color of dots, soft blue
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
    backgroundColor: colors.transparent,
    marginVertical: spacing.md,
  },
  money: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.error,
    textAlign: "left",
  }
})
