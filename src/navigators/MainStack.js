import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/shared/Login";
import Profile from "../screens/shared/Profile";
import ClientDash from "../screens/client/ClientDash";
import ClientSingleTask from "../screens/client/ClientSingleTask";
import ClientTasks from "../screens/client/ClientTasks";
import WorkerDash from "../screens/worker/WorkerDash";
import WorkerTasks from "../screens/worker/WorkerTasks";
import WorkerSingleTask from "../screens/worker/WorkerSingleTask";
import Users from "../screens/worker/Users";
import SingleUser from "../screens/shared/SingleUser";

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ClientDash" component={ClientDash} />
      <Stack.Screen name="ClientTasks" component={ClientTasks} />
      <Stack.Screen name="ClientSingleTask" component={ClientSingleTask} />
      <Stack.Screen name="WorkerDash" component={WorkerDash} />
      <Stack.Screen name="WorkerTasks" component={WorkerTasks} />
      <Stack.Screen name="WorkerSingleTask" component={WorkerSingleTask} />
      <Stack.Screen name="Users" component={Users} />
      <Stack.Screen name="SingleUser" component={SingleUser} />
    </Stack.Navigator>
  );
};

export default MainStack;
