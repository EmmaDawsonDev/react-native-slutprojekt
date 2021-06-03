import React from "react";
import { SafeAreaView, Text, Button } from 'react-native'
import BaseContainer from "../../components/BaseComponents/BaseContainer"

const Users = (props) => {
  return (
    <BaseContainer>
      <Text>USERS</Text>
      <Text>Here we can search and filter</Text>
      <Button onPress={() => props.navigation.navigate('SingleUser')} title="Single User"></Button>
      <Button onPress={() => props.navigation.navigate('SingleUser')} title="Single User TWO"></Button>
      <Button onPress={() => props.navigation.navigate('SingleUser')} title="Single User THREE"></Button>
    </BaseContainer>
  );
};

export default Users;