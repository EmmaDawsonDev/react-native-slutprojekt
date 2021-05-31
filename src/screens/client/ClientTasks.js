import React from "react";
import { SafeAreaView, Text, Button } from "react-native";

const ClientTasksScreen = (props) => {

  // useEffect med API-call, får tasks
  return (
    <SafeAreaView>

      {/* // Lista med singleTasks, skickar task som prop */}
      <Text>CLIENT TASKS</Text>
      <Button onPress={() => props.navigation.navigate('ClientSingleTask')} title="First task"></Button>
    </SafeAreaView>
  );
};

export default ClientTasksScreen;
