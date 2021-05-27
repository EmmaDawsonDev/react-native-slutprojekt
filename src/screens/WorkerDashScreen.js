import React from "react";
import { SafeAreaView, Text, Button } from "react-native";

const WorkerDash = (props) => {
  const pressHandler = () => {
    props.navigation.navigate("ClientDash");
  };

  return (
    <SafeAreaView>
      <Text>This is a home screen</Text>
      <Button onPress={pressHandler} title="Go to client page" />
    </SafeAreaView>
  );
};

export default WorkerDash;
