
import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import ClientDashTabs from "./navigators/ClientDashTabs";
import WorkerDashTabs from "./navigators/WorkerDashTabs";
import AuthContext, { AuthContextProvider } from './store/AuthContext'
import LoginScreen from "./screens/shared/Login";

export default function App() {
  const authContext = useContext(AuthContext)
  useEffect(() => {
    console.log('in useEffect');
    console.log(authContext);
  }, [authContext])

  return (
    <AuthContextProvider>
      <NavigationContainer>
        {!authContext.user ? (
          <LoginScreen />
        ) : (
          authContext.user?.role === 'client' ? (
            <WorkerDashTabs />
          ) : (
            <ClientDashTabs />
          ))}
      </NavigationContainer>
    </AuthContextProvider>
  );
}
