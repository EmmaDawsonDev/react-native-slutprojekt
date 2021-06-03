import React, { useContext, useState, useEffect } from "react";
import { SafeAreaView, Text, Button, FlatList, StyleSheet } from "react-native";
import AuthContext from "../../store/AuthContext";
import { getTasks } from "../../api";
import TaskButton from "../../components/TaskButton";
import Color from "../../constants/color";
import BaseContainer from "../../components/BaseComponents/BaseContainer";

const ClientTasksScreen = (props) => {
  const [tasks, setTasks] = useState([]);

  const { user } = useContext(AuthContext);
  useEffect(() => {
    (async () => {
      const response = await getTasks(user.token);
      setTasks([...response.tasks]);
    })();
  }, []);

  const renderTask = ({ item }) => {
    return (
      <TaskButton
        task={item}
        onPress={() =>
          props.navigation.navigate("ClientSingleTask", { task: item })
        }
      />
    );
  };

  return (
    <BaseContainer>
      {tasks.length && (
        <FlatList
          keyExtractor={(task) => task.id}
          data={tasks}
          renderItem={renderTask}
        />
      )}
    </BaseContainer>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Color.primaryDark,
  },
});

export default ClientTasksScreen;
