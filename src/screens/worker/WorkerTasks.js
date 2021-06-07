import React, { useContext, useState, useEffect } from "react";
import { FlatList, Text, StyleSheet } from "react-native";
import AuthContext from "../../store/AuthContext";
import { getTasks } from "../../api";
import ListCard from "../../components/ListCard";
import TaskFilter from "../../components/TaskFilter";
import BaseContainer from "../../components/BaseComponents/BaseContainer";
import Color from "../../constants/color"

const WorkerTasksScreen = (props) => {
  const [tasks, setTasks] = useState([]);
  const { isLoading } = useContext(AuthContext);
  console.log(isLoading);
  useEffect(() => {
    (async () => {
      const response = await getTasks();
      setTasks(response.tasks);
    })();
  }, []);

  const renderTask = ({ item }) => {
    return (
      <ListCard
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
      {isLoading ? (
        <Text>LOADING...</Text>
      ) : ( 
        tasks.length ?
        <FlatList
          keyExtractor={(task) => String(task.id)}
          data={tasks}
          renderItem={renderTask}
        />:
        <Text style={styles.noTasksMessage}> No tasks were found</Text>
      )}
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

export default WorkerTasksScreen;
