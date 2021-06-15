import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import WorkerTaskStack from "./WorkerTaskStack";
import UsersStack from "./UsersStack";
import ProfileStack from "./ProfileStack";
import Color from "../constants/color";
import Icon from "react-native-vector-icons/FontAwesome5";

const Tab = createBottomTabNavigator();

function WorkerDashTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === "WorkerTaskStack") {
            iconName = "tasks";
          } else if (route.name === "UsersStack") {
            iconName = "users";
          } else if (route.name === "ProfileStack") {
            iconName = "user";
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={28} color={color} />;
        },
      })}
      tabBarOptions={{
        style: { backgroundColor: Color.grey },
        showLabel: false,
        activeTintColor: Color.primaryDark,
        inactiveTintColor: Color.inactive,
      }}
    >
      <Tab.Screen name="WorkerTaskStack" component={WorkerTaskStack} />
      <Tab.Screen name="UsersStack" component={UsersStack} />
      <Tab.Screen name="ProfileStack" component={ProfileStack} />
    </Tab.Navigator>
  );
}

export default WorkerDashTabs;
