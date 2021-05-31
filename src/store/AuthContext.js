import React, { useReducer, useMemo, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store';

const saveUser = async () => {
  await SecureStore.setItemAsync('user', value)
}

const getUser = async () => {
  const user = await SecureStore.getItemAsync('user')
  return user
}

const AuthContext = React.createContext({
  state: null,
  signIn: data => { },
  signOut: () => { }
});

export const AuthContextProvider = props => {
  // skapar ett state-objekt och mutations för state (som anropas med dispatch)
  const [authState, authDispatch] = useReducer((prevState, action) => {
    switch (action.type) {
      case 'SET_USER':
        return {
          ...prevState,
          user: action.user,
          isLoading: false
        }
      case 'SIGN_IN':
        console.log('signin in');
        return {
          ...prevState,
          user: action.user,
          isLoading: false
        }
      case 'SIGN_OUT':
        return {
          ...prevState,
          user: null
        }
    }
  }, {
    isLoading: true,
    user: null
  })

  useEffect(() => {
    (async () => {
      try {
        let user = await getUser()

        if (user) {

          authDispatch({ type: 'SET_USER', user })
        }
      } catch (error) {
        console.log(error);
      }
    })()
  }, [])

  const signIn = async data => {
    console.log('running signIn');
    // 1. skicka email och password till backend
    // << kod här >>
    // 2. Få tillbaka token och logga in:
    authDispatch({
      type: 'SIGN_IN', user: {
        id: 10,
        name: "NewClient",
        email: "newclient@example.com",
        role: "client",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5ld2NsaWVudEBleGFtcGxlLmNvbSIsImlkIjoxMCwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYyMTQ5NTM3OSwiZXhwIjoxNjIxNDk4OTc5fQ.97rZTy4XQvBcUHK2wPrV5uzIeZ5w3wvN6VHp2oAEbHY"
      }
    })
    console.log('authState:');
    console.log(authState)
  }

  const signOut = () => {
    authDispatch({ type: 'SIGN_OUT' })
  }

  const authContext = {
    signIn,
    signOut,
    state: authState
  }

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext