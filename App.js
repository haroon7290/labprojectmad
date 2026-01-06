import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import AddTradeScreen from "./screens/AddTradeScreen";
import RiskCalculatorScreen from "./screens/RiskCalculatorScreen";
import AnalyticsScreen from "./screens/AnalyticsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddTrade" component={AddTradeScreen} />
        <Stack.Screen name="RiskCalculator" component={RiskCalculatorScreen} />
        <Stack.Screen name="Analytics" component={AnalyticsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
