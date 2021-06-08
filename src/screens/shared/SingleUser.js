import React, { useEffect, useState } from "react";
import { Text, StyleSheet } from 'react-native'
import BaseContainer from "../../components/BaseComponents/BaseContainer"
import { getUserById } from '../../api'

const SingleUser = ({ route }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    (async () => {
      const responseUser = await getUserById(route.params.userId)
      setUser(responseUser)
    })()
  }, [])

  return (
    <BaseContainer>
      {!user ? (
        <Text style={styles.loadingMessage}>Loading...</Text>
      ) : (
        <Text style={styles.loadingMessage}>{user.name}</Text>
      )}
    </BaseContainer>
  );
};

const styles = StyleSheet.create({
  loadingMessage: {
    color: 'white'
  }
})

export default SingleUser;