import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text } from "react-native";

import { getUsers } from "../../api";
import ListCard from "../../components/ListCard";
import UserFilter from "../../components/UserFilter";
import Color from "../../constants/color";
import BaseContainer from "../../components/BaseComponents/BaseContainer";

const UsersScreen = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getUsers();
      setUsers(response);
    })();
  }, []);

  const renderUser = ({ item }) => {
    return (
      <ListCard
        text={item.name}
        iconName="caret-right"
        onPress={() =>
          props.navigation.navigate("SingleUser", { userId: item.id })
        }
      />
    );
  };

  const handleFilterUsers = (filteredUsers) => {
    setUsers(filteredUsers);
  };

  return (
    <BaseContainer>
      <UserFilter setUsers={handleFilterUsers} />
      {users.length ? (
        <FlatList
          keyExtractor={(user) => String(user.id)}
          data={users}
          renderItem={renderUser}
        />
      ) : (
        <Text style={styles.noTasksMessage}> No users were found</Text>
      )}
    </BaseContainer>
  );
};

const styles = StyleSheet.create({
  noTasksMessage: {
    color: Color.orange,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: "auto",
  },
});

export default UsersScreen;
