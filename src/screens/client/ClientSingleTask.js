import React from "react";
import { SafeAreaView, Text } from "react-native";
import BaseContainer from "../../components/BaseComponents/BaseContainer"

const ClientSingleTask = ({route}) => {

  // tar emot task som prop
  return (
    <BaseContainer>
      <Text>Title: {route.params.task.title}</Text>
      <Text>ID: {route.params.task.id}</Text>
    </BaseContainer>
  )
}

export default ClientSingleTask