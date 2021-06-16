import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import BaseContainer from "../../components/BaseComponents/BaseContainer";
import ListCard from "../../components/ListCard";
import Color from "../../constants/color";
import { getUserById } from "../../api";

const SingleUser = ({ route, navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const responseUser = await getUserById(route.params.userId);
      setUser(responseUser);
      navigation.setOptions({ title: responseUser.name });
    })();
  }, []);

  // useEffect(() => {

  // }, [user]);

  return (
    <BaseContainer>
      {!user ? (
        <Text style={styles.loadingMessage}>Loading...</Text>
      ) : (
        <View>
          <View style={styles.circle}>
            <Icon name="user" size={60} color="white" solid />
          </View>
          <ListCard iconName="id-badge" text={user.name} />
          <ListCard iconName="envelope" text={user.email} />
        </View>
      )}
    </BaseContainer>
  );
};

const styles = StyleSheet.create({
  loadingMessage: {
    color: "white",
  },
  circle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.secondaryDark,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
    borderRadius: 100,
    height: 100,
    width: 100,
    alignSelf: "center",
    marginBottom: 30,
  },
});

export default SingleUser;
