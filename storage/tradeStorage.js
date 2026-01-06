import AsyncStorage from "@react-native-async-storage/async-storage";

const TRADE_KEY = "TRADES";
const BALANCE_KEY = "BALANCE";

export const getTrades = async () => {
  const data = await AsyncStorage.getItem(TRADE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveTrades = async (trades) => {
  await AsyncStorage.setItem(TRADE_KEY, JSON.stringify(trades));
};

export const deleteTradeById = async (id) => {
  const trades = await getTrades();
  const updated = trades.filter(t => t.id !== id);
  await saveTrades(updated);
  return updated;
};

export const getBalance = async () => {
  const b = await AsyncStorage.getItem(BALANCE_KEY);
  return b ? Number(b) : 0;
};

export const saveBalance = async (balance) => {
  await AsyncStorage.setItem(BALANCE_KEY, balance.toString());
};
