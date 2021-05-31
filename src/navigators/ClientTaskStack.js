import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ClientSingleTask from "../screens/client/ClientSingleTask";
import ClientTasks from "../screens/client/ClientTasks";

const Stack = createStackNavigator();

const ClientTaskStack = () => {
  return (
    <Stack.Navigator initialRouteName="ClientTasks">
      <Stack.Screen name="ClientTasks" component={ClientTasks} />
      <Stack.Screen name="ClientSingleTask" component={ClientSingleTask} />
    </Stack.Navigator>
  );
};

export default ClientTaskStack;
