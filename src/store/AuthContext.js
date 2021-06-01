import React, { useReducer, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

import { login } from "../api";

const saveUser = async () => {
  await SecureStore.setItemAsync("user", value);
};

const getUser = async () => {
  const user = await SecureStore.getItemAsync("user");
  return user;
};

const AuthContext = React.createContext({
  user: null,
  isLoading: false,
  signIn: (data) => {},
  signOut: () => {},
});

export const AuthContextProvider = (props) => {
  // skapar ett state-objekt och mutations för state (som anropas med dispatch)
  const [authState, authDispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "SET_USER":
          return {
            ...prevState,
            user: action.user,
            isLoading: false,
          };

        case "SIGN_IN":
          return {
            ...prevState,
            user: action.user,
            isLoading: false,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            user: null,
          };
      }
    },
    {
      isLoading: true,
      user: null,
    }
  );

  useEffect(() => {
    (async () => {
      try {
        let user = await getUser();

        if (user) {
          authDispatch({ type: "SET_USER", user });
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const signIn = async (data) => {
    console.log("running signIn", authState);
    // 1. skicka email och password till backend
    const user = await login(data);
    console.log("I am the user", user);
    // 2. Få tillbaka token och logga in:
    authDispatch({
      type: "SIGN_IN",
      user: user,
    });
    console.log("authState:");
    console.log(authState);
  };

  const signOut = () => {
    authDispatch({ type: "SIGN_OUT" });
  };

  const authContext = {
    signIn,
    signOut,
    user: authState.user,
    isLoading: authState.isLoading,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
