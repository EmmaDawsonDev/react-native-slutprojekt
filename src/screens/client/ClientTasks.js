import React from "react";
import { SafeAreaView, Text, Button } from "react-native";

const ClientTasksScreen = (props) => {
  return (
    <SafeAreaView>
      <Text>CLIENT TASKS</Text>
      <Button onPress={() => props.navigation.navigate('ClientSingleTask')} title="First task"></Button>
    </SafeAreaView>
  );
};

export default ClientTasksScreen;
