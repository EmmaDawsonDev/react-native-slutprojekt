import React, { useState } from "react";
import { SafeAreaView, Text, Button } from "react-native";

const LoginScreen = (props) => {
  const [role, setRole] = useState("worker");
  const pressHandler = () => {
    if (role === "client") {
      props.navigation.navigate("WorkerDash");
    } else {
      props.navigation.navigate("ClientDash");
    }
  };

  return (
    <SafeAreaView>
      <Button title="Log in" onPress={pressHandler} />
    </SafeAreaView>
  );
};

export default LoginScreen;
