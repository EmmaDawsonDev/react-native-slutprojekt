import React from "react";
import { SafeAreaView, Text, Button } from "react-native";

const WorkerDash = (props) => {
  const pressHandler = () => {
    props.navigation.navigate("ClientDash");
  };

  return (
    <SafeAreaView>
      <Text>This is the worker dashboard</Text>
      <Button
        onPress={() => {
          props.navigation.navigate("Profile");
        }}
        title="My profile"
      />
      <Button
        onPress={() => {
          props.navigation.navigate("WorkerTasks");
        }}
        title="My tasks"
      />
      <Button
        onPress={() => {
          props.navigation.navigate("Users");
        }}
        title="See users"
      />
    </SafeAreaView>
  );
};

export default WorkerDash;
