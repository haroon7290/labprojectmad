// ==================================================
// screens/HomeScreen.js (Add Initial Balance Adjustment)
// ==================================================

import React, { useCallback, useState } from "react";
import { View, Text, Button, FlatList, Image, TouchableOpacity, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "@react-navigation/native";
import Card from "../components/Card";
import { getTrades, getBalance, saveBalance, deleteTradeById } from "../storage/tradeStorage";

export default function HomeScreen({ navigation }) {
  const [trades, setTrades] = useState([]);
  const [balance, setBalance] = useState(0);
  const [filter, setFilter] = useState("all");
  const [editingBalance, setEditingBalance] = useState(false);
  const [tempBalance, setTempBalance] = useState('');

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  const load = async () => {
    const t = await getTrades();
    const b = await getBalance();
    setTrades(t);
    setBalance(b);
  };

  const saveNewBalance = async () => {
    const newBalance = Number(tempBalance);
    if (!isNaN(newBalance)) {
      await saveBalance(newBalance);
      setBalance(newBalance);
      setEditingBalance(false);
    }
  };

  const deleteTrade = async (id) => {
    const updated = await deleteTradeById(id);
    setTrades(updated);
  };

  const filteredTrades = trades.filter(
    (t) => filter === "all" || t.direction === filter
  );

  const todayPnL = trades.reduce((sum, t) => sum + Number(t.pnl || 0), 0);

  return (
    <View style={{ flex: 1, backgroundColor: "#020617" }}>
      {/* BTC Banner */}
      <Image
        source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvOBmPIc50KbuLTlbub4hiYORZS9h2sUek4w&s" }}
        style={{ width: "100%", height: 200, resizeMode: "contain", marginTop: 10 }}
      />

      //B
      <Card>
        {!editingBalance ? (
          <View>
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>Balance: ${balance}</Text>
            <Button title="Edit Balance" onPress={() => { setTempBalance(balance.toString()); setEditingBalance(true); }} />
          </View>
        ) : (
          <View>
            <TextInput
              value={tempBalance}
              onChangeText={setTempBalance}
              keyboardType="numeric"
              style={{ color: "#fff", borderBottomWidth: 1, borderBottomColor: "#CBD5F5", marginBottom: 6 }}
            />
            <Button title="Save Balance" onPress={saveNewBalance} />
          </View>
        )}

        <Text style={{ color: todayPnL >= 0 ? "#22C55E" : "#EF4444", fontWeight: "bold", marginTop: 6 }}>Daily PnL: {todayPnL}</Text>
      </Card>

      //N
      <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 10 }}>
        <Button title="➕ Add Trade" onPress={() => navigation.navigate("AddTrade")} />
        <Button title="📐 Risk Calculator" onPress={() => navigation.navigate("RiskCalculator")} />
        <Button title="📊 Analytics" onPress={() => navigation.navigate("Analytics")} />
      </View>

      //F
      <View style={{ paddingHorizontal: 15, marginBottom: 10 }}>
        <Text style={{ color: "#94A3B8", marginBottom: 4 }}>Filter by Direction:</Text>
        <Picker
          selectedValue={filter}
          onValueChange={(value) => setFilter(value)}
          style={{ color: "#fff", backgroundColor: "#1E293B", borderRadius: 8 }}
        >
          <Picker.Item label="All" value="all" />
          <Picker.Item label="Long" value="Long" />
          <Picker.Item label="Short" value="Short" />
        </Picker>
      </View>

      {/* Trades List */}
      <FlatList
        data={filteredTrades}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 20 }}
        renderItem={({ item }) => (
          <Card>
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>{item.pair} ({item.direction})</Text>
            <Text style={{ color: "#CBD5F5" }}>Entry: {item.entry} | Size: {item.size}</Text>
            <Text style={{ color: "#CBD5F5" }}>Strategy: {item.strategy}</Text>
            <Text style={{ color: item.pnl >= 0 ? "#22C55E" : "#EF4444", fontWeight: "bold" }}>PnL: {item.pnl}</Text>
            <Text style={{ color: "#94A3B8" }}>Date: {new Date(item.date).toLocaleDateString()}</Text>
            <TouchableOpacity onPress={() => deleteTrade(item.id)} style={{ marginTop: 6 }}>
              <Text style={{ color: "#EF4444" }}>Delete Trade</Text>
            </TouchableOpacity>
          </Card>
        )}
      />
    </View>
  );
}