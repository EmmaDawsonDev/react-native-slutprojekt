import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Users from "../screens/worker/Users";
import SingleUser from "../screens/shared/SingleUser";

const Stack = createStackNavigator();

const UsersStack = () => {
  return (
    <Stack.Navigator initialRouteName="Users">
      <Stack.Screen name="Users" component={Users} />
      <Stack.Screen name="SingleUser" component={SingleUser} />
    </Stack.Navigator>
  );
};

export default UsersStack;
