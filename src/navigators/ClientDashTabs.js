import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../screens/shared/Profile";
import ClientTaskStack from "./ClientTaskStack";
import Color from '../constants/color'
import Icon from 'react-native-vector-icons/FontAwesome5'

const Tab = createBottomTabNavigator();

function ClientDashTabs() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'ClientTaskStack') {
          iconName = 'tasks'
        } else if (route.name === 'Profile') {
          iconName = 'user'
        }

        // You can return any component that you like here!
        return <Icon name={iconName} size={28} color={color} />;
      },
    })}
      tabBarOptions={{
        style: { backgroundColor: Color.grey },
        showLabel: false,
        activeTintColor: Color.primaryDark,
        inactiveTintColor: Color.inactive
      }}>
      <Tab.Screen name="ClientTaskStack" component={ClientTaskStack} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default ClientDashTabs;
