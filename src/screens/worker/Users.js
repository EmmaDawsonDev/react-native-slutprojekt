import React from "react";
import { SafeAreaView, Text, Button } from 'react-native'

const Users = (props) => {
  return (
    <SafeAreaView>
      <Text>USERS</Text>
      <Text>Here we can search and filter</Text>
      <Button onPress={() => props.navigation.navigate('SingleUser')} title="Single User"></Button>
      <Button onPress={() => props.navigation.navigate('SingleUser')} title="Single User TWO"></Button>
      <Button onPress={() => props.navigation.navigate('SingleUser')} title="Single User THREE"></Button>
    </SafeAreaView>
  );
};

export default Users;