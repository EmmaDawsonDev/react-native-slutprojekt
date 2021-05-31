import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Profile from "../screens/shared/Profile";
import WorkerTaskStack from "./WorkerTaskStack";
import UsersStack from "./UsersStack";

const Tab = createBottomTabNavigator();

function WorkerDashTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="WorkerTaskStack" component={WorkerTaskStack} />
      <Tab.Screen name="UsersStack" component={UsersStack} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default WorkerDashTabs;
