import React from "react";
import { SafeAreaView, Text } from "react-native";

const ClientSingleTask = ({route}) => {

  // tar emot task som prop
  return (
    <SafeAreaView>
      <Text>Title: {route.params.task.title}</Text>
      <Text>ID: {route.params.task.id}</Text>
    </SafeAreaView>
  )
}

export default ClientSingleTask