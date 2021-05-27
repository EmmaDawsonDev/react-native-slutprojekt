import React from "react";
import { Text, SafeAreaView, Button } from "react-native";

const ClientDash = (props) => {
  return (
    <SafeAreaView>
      <Text>This is an edit screen</Text>
      <Button
        onPress={() => {
          props.navigation.navigate("Profile");
        }}
        title="My profile"
      />
      <Button
        onPress={() => {
          props.navigation.navigate("ClientTasks");
        }}
        title="My tasks"
      />
    </SafeAreaView>
  );
};

export default ClientDash;
