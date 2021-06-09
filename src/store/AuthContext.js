import React, { useReducer, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { login, setDefaultHeaders } from "../api";

const saveUser = async (value) => {
  await SecureStore.setItemAsync("user", value);
};

const getUser = async () => {
  const user = await SecureStore.getItemAsync("user");
  return JSON.parse(user);
};

const clearUser = async () => {
  await SecureStore.deleteItemAsync("user");
};

const AuthContext = React.createContext({
  user: null,
  isLoading: false,
  signIn: (data) => { },
  signOut: () => { },
  updateUser: () => { }
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
            isLoading: true,
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
          setDefaultHeaders(user.token);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const signIn = async (data) => {
    // 1. skicka email och password till backend
    const user = await login(data);
    if (!user) {
      return false;
    }
    await saveUser(JSON.stringify(user));
    // 2. Få tillbaka token och logga in:
    authDispatch({
      type: "SIGN_IN",
      user: user,
    });
    return true;
  };

  const updateUser = (user) => {
    authDispatch({
      type: "SET_USER",
      user: user,
    });

    saveUser(JSON.stringify(user))
  }

  const signOut = () => {
    authDispatch({ type: "SIGN_OUT" });
    clearUser();
  };

  const authContext = {
    signIn,
    signOut,
    updateUser,
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
