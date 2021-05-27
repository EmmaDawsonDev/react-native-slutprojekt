import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/LoginScreen";
import WorkerDash from "../screens/WorkerDashScreen";
import ClientDash from "../screens/ClientDashScreen";

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="WorkerDash" component={WorkerDash} />
      <Stack.Screen name="ClientDash" component={ClientDash} />
    </Stack.Navigator>
  );
};

export default MainStack;
