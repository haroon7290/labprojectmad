import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { getTrades, saveTrades, getBalance, saveBalance } from "../storage/tradeStorage";


export default function AddTradeScreen({ navigation }) {
const [pair, setPair] = useState("");
const [entry, setEntry] = useState("");
const [size, setSize] = useState("");
const [pnl, setPnl] = useState("");
const [direction, setDirection] = useState("Long");
const [strategy, setStrategy] = useState("");
const [date, setDate] = useState(new Date().toISOString().split('T')[0]);


const save = async () => {
const trades = await getTrades();
const balance = await getBalance();


const newTrade = {
id: Date.now().toString(),
pair,
entry: Number(entry),
size: Number(size),
pnl: Number(pnl),
direction,
strategy,
date,
};


await saveTrades([...trades, newTrade]);
await saveBalance(balance + Number(pnl));


navigation.goBack();
};


return (
<View style={{ flex: 1, padding: 20, backgroundColor: "#020617" }}>
<TextInput placeholder="Pair" placeholderTextColor="#94A3B8" style={{ color: "#fff", borderBottomWidth: 1, marginBottom: 10 }} value={pair} onChangeText={setPair} />
<TextInput placeholder="Entry" placeholderTextColor="#94A3B8" keyboardType="numeric" style={{ color: "#fff", borderBottomWidth: 1, marginBottom: 10 }} value={entry} onChangeText={setEntry} />
<TextInput placeholder="Position Size" placeholderTextColor="#94A3B8" keyboardType="numeric" style={{ color: "#fff", borderBottomWidth: 1, marginBottom: 10 }} value={size} onChangeText={setSize} />
<TextInput placeholder="PnL" placeholderTextColor="#94A3B8" keyboardType="numeric" style={{ color: "#fff", borderBottomWidth: 1, marginBottom: 10 }} value={pnl} onChangeText={setPnl} />
<TextInput placeholder="Direction (Long / Short)" placeholderTextColor="#94A3B8" style={{ color: "#fff", borderBottomWidth: 1, marginBottom: 10 }} value={direction} onChangeText={setDirection} />
<TextInput placeholder="Strategy Label" placeholderTextColor="#94A3B8" style={{ color: "#fff", borderBottomWidth: 1, marginBottom: 10 }} value={strategy} onChangeText={setStrategy} />
<TextInput placeholder="Date (YYYY-MM-DD)" placeholderTextColor="#94A3B8" style={{ color: "#fff", borderBottomWidth: 1, marginBottom: 20 }} value={date} onChangeText={setDate} />
<Button title="Save Trade" onPress={save} />
</View>
);
}