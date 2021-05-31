import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import WorkerTasks from "../screens/worker/WorkerTasks";
import WorkerSingleTask from "../screens/worker/WorkerSingleTask";

const Stack = createStackNavigator();

const WorkerTaskStack = () => {
  return (
    <Stack.Navigator initialRouteName="WorkerTasks">
      <Stack.Screen name="WorkerTasks" component={WorkerTasks} />
      <Stack.Screen name="WorkerSingleTask" component={WorkerSingleTask} />
    </Stack.Navigator>
  );
};

export default WorkerTaskStack;
