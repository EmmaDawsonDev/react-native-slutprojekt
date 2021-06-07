import React, { useContext, useState, useEffect } from "react";
import { SafeAreaView, FlatList, StyleSheet, Text } from "react-native";
import AuthContext from "../../store/AuthContext";
import { getUsers } from "../../api";
import ListCard from "../../components/ListCard";
import UserFilter from "../../components/UserFilter";
import Color from "../../constants/color";
import BaseContainer from "../../components/BaseComponents/BaseContainer";

const UsersScreen = (props) => {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const response = await getUsers();
      setUsers(response);
    })();
  }, []);

  const renderUser = ({ item }) => {
    return (
      <ListCard
        user={item}
        onPress={() => props.navigation.navigate("SingleUser", { user: item })}
      />
    );
  };

  const handleFilterUsers = (filteredUsers) => {
    setUsers(filteredUsers);
  };

  return (
    <BaseContainer>
      <UserFilter setUsers={handleFilterUsers} />
      {users.length ? 
      <FlatList
        keyExtractor={(user) => String(user.id)}
        data={users}
        renderItem={renderUser}
      />:
      <Text style={styles.noTasksMessage}> No users were found</Text> }
    </BaseContainer>
  );
};

const styles = StyleSheet.create({
  noTasksMessage:{
    color: Color.orange,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 'auto',
  }
})

export default UsersScreen;
