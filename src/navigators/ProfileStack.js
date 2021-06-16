import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Profile from "../screens/shared/Profile";
import Color from '../constants/color'

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: Color.grey } }} initialRouteName="Users">
      <Stack.Screen name="Profile" options={{ title: 'My Profile' }} component={Profile} />
    </Stack.Navigator>
  );
};

export default ProfileStack;