import React, { useContext, useState, useEffect } from "react";
import { SafeAreaView, FlatList, StyleSheet, Text } from "react-native";
import AuthContext from "../../store/AuthContext";
import { getTasks } from "../../api";
import TaskButton from "../../components/TaskButton";
import TaskFilter from "../../components/TaskFilter";
import Color from "../../constants/color";
import BaseContainer from "../../components/BaseComponents/BaseContainer";

const UsersScreen = (props) => {
  const [users, setUsers] = useState([]);
  // const { user } = useContext(AuthContext);

  // useEffect(() => {
  //   (async () => {
  //     console.log("User screen");
  //     const response = await getUsers();
  //     setUsers(response.users);
  //   })();
  // }, []);

  // const renderUser = ({ item }) => {
  //   return (
  //     <TaskButton
  //       user={item}
  //       onPress={() => props.navigation.navigate("SingleUser", { user: item })}
  //     />
  //   );
  // };

  // const handleFilterTasks = (filteredTasks) => {
  //   setTasks(filteredTasks);
  // };

  return (
    <BaseContainer>
      {/* <TaskFilter setTasks={handleFilterTasks} /> */}
      {/* <FlatList
        keyExtractor={(user) => String(user.id)}
        data={users}
        renderItem={renderUser}
      /> */}
      <Text>I am the user screen</Text>
    </BaseContainer>
  );
};

// const styles = StyleSheet.create({

// })

export default UsersScreen;
