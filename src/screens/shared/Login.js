import React, { useState, useContext } from "react";
import { SafeAreaView, Text, TextInput, Button } from "react-native";
import AuthContext from "../../store/AuthContext";

const LoginScreen = (props) => {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const [role, setRole] = useState("worker");
  const pressHandler = () => {
    signIn({ email, password });
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 60 }}>
      <Text>Email</Text>
      <TextInput
        style={{
          borderColor: "black",
          borderStyle: "solid",
          borderWidth: 2,
          backgroundColor: "#dedede",
          height: 40,
        }}
        onChangeText={(text) => {
          setEmail(text);
        }}
        value={email}
        placeholder="This is the email"
      />
      <Text>Password</Text>
      <TextInput
        style={{
          borderColor: "black",
          borderStyle: "solid",
          borderWidth: 2,
          backgroundColor: "#dedede",
          height: 40,
        }}
        onChangeText={(text) => {
          setPassword(text);
        }}
        value={password}
        placeholder="This is the password"
      />
      <Button title="Log in" onPress={pressHandler} />
    </SafeAreaView>
  );
};

export default LoginScreen;
