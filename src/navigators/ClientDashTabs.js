import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Profile from "../screens/shared/Profile";
import ClientTaskStack from "./ClientTaskStack";

const Tab = createBottomTabNavigator();

function ClientDashTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="ClientTaskStack" component={ClientTaskStack} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default ClientDashTabs;
