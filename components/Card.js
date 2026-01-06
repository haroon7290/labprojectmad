import React from "react";
import { View } from "react-native";

export default function Card({ children }) {
  return (
    <View style={{
      backgroundColor: "#1e293b",
      padding: 15,
      borderRadius: 12,
      marginBottom: 10
    }}>
      {children}
    </View>
  );
}
