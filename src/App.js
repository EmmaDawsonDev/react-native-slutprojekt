import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import ClientDashTabs from "./navigators/ClientDashTabs";
import WorkerDashTabs from "./navigators/WorkerDashTabs";
import AuthContext, { AuthContextProvider } from "./store/AuthContext";
import LoginScreen from "./screens/shared/Login";

export default function App() {
  // useEffect(() => {
  //   console.log("in useEffect");
  //   console.log(authContext);
  // }, [authContext]);

  return (
    <AuthContextProvider>
      <AuthNavigation />
    </AuthContextProvider>
  );
}

const AuthNavigation = () => {
  const authContext = useContext(AuthContext);
  return !authContext.user ? (
    <LoginScreen />
  ) : (
    <NavigationContainer>
      {authContext.user.role === "worker" ? (
        <WorkerDashTabs />
      ) : (
        <ClientDashTabs />
      )}
    </NavigationContainer>
  );
};
