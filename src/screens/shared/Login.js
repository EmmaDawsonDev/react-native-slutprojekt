import React, { useState, useContext } from "react";
import { SafeAreaView, Text, Button } from "react-native";
import AuthContext from '../../store/AuthContext'

const LoginScreen = (props) => {
  const { signIn } = useContext(AuthContext)

  // const [role, setRole] = useState("worker");
  const pressHandler = () => {
    signIn({ email: 'client1@yahoo.com', password: 'Grillkorv' })
  };

  return (
    <SafeAreaView>
      <Button title="Log in" onPress={pressHandler} />
    </SafeAreaView>
  );
};

export default LoginScreen;
