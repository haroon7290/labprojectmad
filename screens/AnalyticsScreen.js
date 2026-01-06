
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { getTrades } from "../storage/tradeStorage";
import Card from "../components/Card";

export default function AnalyticsScreen() {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    loadTrades();
  }, []);

  const loadTrades = async () => {
    const data = await getTrades();
    setTrades(data);
  };

  const totalTrades = trades.length;
  const wins = trades.filter(t => Number(t.pnl) > 0);
  const losses = trades.filter(t => Number(t.pnl) < 0);

  const winRate = totalTrades
    ? ((wins.length / totalTrades) * 100).toFixed(1)
    : 0;

  const totalPnL = trades.reduce((sum, t) => sum + Number(t.pnl || 0), 0);

  const avgWin = wins.length
    ? (wins.reduce((s, t) => s + Number(t.pnl), 0) / wins.length).toFixed(2)
    : 0;

  const avgLoss = losses.length
    ? (losses.reduce((s, t) => s + Number(t.pnl), 0) / losses.length).toFixed(2)
    : 0;

  const expectancy = totalTrades
    ? ((wins.length / totalTrades) * avgWin + (losses.length / totalTrades) * avgLoss).toFixed(2)
    : 0;

  const strategyStats = {};
  trades.forEach(t => {
    if (!strategyStats[t.strategy]) {
      strategyStats[t.strategy] = { count: 0, pnl: 0 };
    }
    strategyStats[t.strategy].count += 1;
    strategyStats[t.strategy].pnl += Number(t.pnl);
  });

  return (
    <ScrollView style={{ flex: 1, padding: 15, backgroundColor: "#020617" }}>
      {/* PERFORMANCE OVERVIEW */}
      <Card>
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold", marginBottom: 8 }}>Performance Overview</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: "#CBD5F5" }}>Total Trades:</Text>
          <Text style={{ color: "#fff" }}>{totalTrades}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: "#22C55E" }}>Wins:</Text>
          <Text style={{ color: "#22C55E" }}>{wins.length}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: "#EF4444" }}>Losses:</Text>
          <Text style={{ color: "#EF4444" }}>{losses.length}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: "#38BDF8" }}>Win Rate:</Text>
          <Text style={{ color: "#38BDF8" }}>{winRate}%</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: totalPnL >= 0 ? "#22C55E" : "#EF4444" }}>Total PnL:</Text>
          <Text style={{ color: totalPnL >= 0 ? "#22C55E" : "#EF4444", fontWeight: "bold" }}>{totalPnL}</Text>
        </View>
      </Card>

      {/* TRADE QUALITY */}
      <Card>
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>Trade Quality</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: "#22C55E" }}>Average Win:</Text>
          <Text style={{ color: "#22C55E" }}>{avgWin}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: "#EF4444" }}>Average Loss:</Text>
          <Text style={{ color: "#EF4444" }}>{avgLoss}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: expectancy >= 0 ? "#22C55E" : "#EF4444", fontWeight: "bold" }}>Expectancy:</Text>
          <Text style={{ color: expectancy >= 0 ? "#22C55E" : "#EF4444", fontWeight: "bold" }}>{expectancy}</Text>
        </View>
      </Card>

      {/* STRATEGY BREAKDOWN */}
      <Card>
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>Strategy Breakdown</Text>
        {Object.keys(strategyStats).length === 0 ? (
          <Text style={{ color: "#94A3B8" }}>No strategies recorded</Text>
        ) : (
          Object.entries(strategyStats).map(([name, data]) => (
            <View key={name} style={{ marginBottom: 6, flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ color: "#CBD5F5" }}>{name}</Text>
              <Text style={{ color: data.pnl >= 0 ? "#22C55E" : "#EF4444" }}>Trades: {data.count} | PnL: {data.pnl.toFixed(2)}</Text>
            </View>
          ))
        )}
      </Card>
    </ScrollView>
  );
}
