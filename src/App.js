import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import ClientDashTabs from "./navigators/ClientDashTabs";
import WorkerDashTabs from "./navigators/WorkerDashTabs";

export default function App() {
  const [role, setRole] = useState("worker");
  return (
    <NavigationContainer>
      {role === "worker" ? <WorkerDashTabs /> : <ClientDashTabs />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
