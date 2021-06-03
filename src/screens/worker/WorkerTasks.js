import React, { useContext, useState, useEffect } from "react";
import { SafeAreaView, FlatList, StyleSheet } from "react-native";
import AuthContext from "../../store/AuthContext";
import { getTasks } from "../../api";
import TaskButton from "../../components/TaskButton";
import TaskFilter from "../../components/TaskFilter";
import Color from "../../constants/color";
import BaseContainer from "../../components/BaseComponents/BaseContainer";

const WorkerTasksScreen = (props) => {
  const [tasks, setTasks] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const response = await getTasks();
      setTasks(response.tasks);
    })();
  }, []);

  const renderTask = ({ item }) => {
    return (
      <TaskButton
        task={item}
        onPress={() =>
          props.navigation.navigate("WorkerSingleTask", { task: item })
        }
      />
    );
  };

  const handleFilterTasks = (filteredTasks) => {
    setTasks(filteredTasks);
  };

  return (
    <BaseContainer>
      <TaskFilter setTasks={handleFilterTasks} />
      <FlatList
        keyExtractor={(task) => String(task.id)}
        data={tasks}
        renderItem={renderTask}
      />
    </BaseContainer>
  );
};

// const styles = StyleSheet.create({

// })

export default WorkerTasksScreen;
