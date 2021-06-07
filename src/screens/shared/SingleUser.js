import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, StyleSheet } from 'react-native'
import BaseContainer from "../../components/BaseComponents/BaseContainer"
import { getUserById } from '../../api'

const SingleUser = ({ route }) => {
  const user = route.params.user
  console.log(route.params);
  // useEffect(() => {
  //   (async () => {
  //     console.log('running useEffect in SingleUser');
  //     const responseUser = await getUserById(route.params.userId)
  //     console.log(responseUser);
  //     setUser({ responseUser })
  //   })()
  // }, [])

  return (
    <BaseContainer>
      {user ? (
        <Text style={styles.loadingMessage}>Loading...</Text>
      ) : (
        <Text>{user.name}</Text>
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