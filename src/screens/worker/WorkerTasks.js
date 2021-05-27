import React from "react";
import { SafeAreaView, Button } from "react-native";

const WorkerTasks = (props) => {
  return (
    <SafeAreaView>
      <Button onPress={() => props.navigation.navigate('WorkerSingleTask')} title="First task"></Button>
    </SafeAreaView>
  )
}

export default WorkerTasks