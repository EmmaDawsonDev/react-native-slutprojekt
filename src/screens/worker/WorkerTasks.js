import React, { useContext, useState, useEffect } from "react";
import { FlatList } from "react-native";
import AuthContext from "../../store/AuthContext";
import { getTasks } from "../../api";
import ListCard from "../../components/ListCard";
import TaskFilter from "../../components/TaskFilter";
import BaseContainer from "../../components/BaseComponents/BaseContainer";

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
        <FlatList
          keyExtractor={(task) => String(task.id)}
          data={tasks}
          renderItem={renderTask}
        />
      )}
    </BaseContainer>
  );
};

export default WorkerTasksScreen;
