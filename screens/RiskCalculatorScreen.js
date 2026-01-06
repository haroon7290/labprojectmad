import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import Card from "../components/Card";

export default function RiskCalculatorScreen() {
  const [balance, setBalance] = useState("");
  const [riskPercent, setRiskPercent] = useState("1");
  const [entry, setEntry] = useState("");
  const [stop, setStop] = useState("");
  const [target, setTarget] = useState("");

  const numericBalance = Number(balance);
  const numericRisk = Number(riskPercent);
  const entryPrice = Number(entry);
  const stopPrice = Number(stop);
  const targetPrice = Number(target);

  const riskAmount =
    numericBalance && numericRisk
      ? (numericBalance * numericRisk) / 100
      : 0;

  const stopDistance =
    entryPrice && stopPrice
      ? Math.abs(entryPrice - stopPrice)
      : 0;

  const positionSize =
    stopDistance ? (riskAmount / stopDistance).toFixed(2) : "0";

  const reward =
    entryPrice && targetPrice
      ? Math.abs(targetPrice - entryPrice) * positionSize
      : 0;

  const rrRatio =
    riskAmount && reward ? (reward / riskAmount).toFixed(2) : "0";

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#020617" }}>
      <Card>
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
          Advanced Risk Calculator
        </Text>

        <TextInput
          placeholder="Account Balance ($)"
          placeholderTextColor="#94A3B8"
          keyboardType="numeric"
          style={{ color: "#fff", borderBottomWidth: 1, marginTop: 10 }}
          value={balance}
          onChangeText={setBalance}
        />

        <TextInput
          placeholder="Risk % per Trade"
          placeholderTextColor="#94A3B8"
          keyboardType="numeric"
          style={{ color: "#fff", borderBottomWidth: 1, marginTop: 10 }}
          value={riskPercent}
          onChangeText={setRiskPercent}
        />

        <TextInput
          placeholder="Entry Price"
          placeholderTextColor="#94A3B8"
          keyboardType="numeric"
          style={{ color: "#fff", borderBottomWidth: 1, marginTop: 10 }}
          value={entry}
          onChangeText={setEntry}
        />

        <TextInput
          placeholder="Stop Loss Price"
          placeholderTextColor="#94A3B8"
          keyboardType="numeric"
          style={{ color: "#fff", borderBottomWidth: 1, marginTop: 10 }}
          value={stop}
          onChangeText={setStop}
        />

        <TextInput
          placeholder="Take Profit Price"
          placeholderTextColor="#94A3B8"
          keyboardType="numeric"
          style={{ color: "#fff", borderBottomWidth: 1, marginTop: 10 }}
          value={target}
          onChangeText={setTarget}
        />

        <View style={{ marginTop: 20 }}>
          <Text style={{ color: "#22C55E" }}>
            Risk Amount: ${riskAmount.toFixed(2)}
          </Text>

          <Text style={{ color: "#38BDF8" }}>
            Position Size: {positionSize}
          </Text>

          <Text style={{ color: "#FACC15" }}>
            Expected Reward: ${Number(reward).toFixed(2)}
          </Text>

          <Text
            style={{
              color: rrRatio >= 2 ? "#22C55E" : "#EF4444",
              fontWeight: "bold",
            }}
          >
            Risk / Reward Ratio: {rrRatio}:1
          </Text>
        </View>
      </Card>
    </View>
  );
}
