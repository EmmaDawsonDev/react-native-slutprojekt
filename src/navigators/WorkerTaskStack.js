import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WorkerTasks from "../screens/worker/WorkerTasks";
import WorkerSingleTask from "../screens/worker/WorkerSingleTask";
import Color from "../constants/color";
import { TasksContextProvider } from "../store/WorkerTasksContext";

const Stack = createStackNavigator();

const WorkerTaskStack = () => {
  return (
    <TasksContextProvider>
      <Stack.Navigator
        screenOptions={{ headerStyle: { backgroundColor: Color.grey } }}
        initialRouteName="WorkerTasks"
      >
        <Stack.Screen name="WorkerTasks" component={WorkerTasks} />
        <Stack.Screen name="WorkerSingleTask" component={WorkerSingleTask} />
      </Stack.Navigator>
    </TasksContextProvider>
  );
};

export default WorkerTaskStack;
