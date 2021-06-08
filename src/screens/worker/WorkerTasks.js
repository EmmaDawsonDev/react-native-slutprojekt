import React, { useContext, useState, useEffect } from "react";
import { TouchableOpacity, FlatList, Text, StyleSheet } from "react-native";
import AuthContext from "../../store/AuthContext";
import TaskContext from "../../store/WorkerTasksContext";
import { getTasks } from "../../api";
import ListCard from "../../components/ListCard";
import TaskFilter from "../../components/TaskFilter";
import BaseContainer from "../../components/BaseComponents/BaseContainer";
import Color from "../../constants/color";
import Icon from "react-native-vector-icons/FontAwesome5";
import AddTaskModal from "../../components/Modals/AddTaskModal";

const WorkerTasksScreen = (props) => {
  const { tasks, setTasks } = useContext(TaskContext);
  const { isLoading } = useContext(AuthContext);

  const [addTaskModalVisible, setAddTaskModalVisible] = useState(false);

  const renderTask = ({ item }) => {
    return (
      <ListCard
        task={item}
        iconName="caret-right"
        onPress={() =>
          props.navigation.navigate("WorkerSingleTask", {
            task: item,
          })
        }
      />
    );
  };

  const handleFilterTasks = (filteredTasks) => {
    setTasks(filteredTasks);
  };

  return (
    <BaseContainer>
      <AddTaskModal
        modalVisible={addTaskModalVisible}
        setModalVisible={setAddTaskModalVisible}
      />
      <TaskFilter setTasks={handleFilterTasks} />
      {isLoading ? (
        <Text>LOADING...</Text>
      ) : tasks.length ? (
        <FlatList
          keyExtractor={(task) => String(task.id)}
          data={tasks}
          renderItem={renderTask}
        />
      ) : (
        <Text style={styles.noTasksMessage}> No tasks were found</Text>
      )}
      <TouchableOpacity
        style={styles.addTaskBtn}
        onPress={() => {
          setAddTaskModalVisible(true);
        }}
      >
        <Icon name="plus" size={28} color="white" />
      </TouchableOpacity>
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
  addTaskBtn: {
    width: 60,
    height: 60,
    backgroundColor: Color.blue,
    borderRadius: 100,
    position: "absolute",
    right: 15,
    bottom: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // Works only on IOS
    shadowColor: "black",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
  },
});

export default WorkerTasksScreen;
