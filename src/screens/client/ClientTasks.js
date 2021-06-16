import React, { useContext, useState, useEffect } from "react";
import { FlatList, StyleSheet, View, ActivityIndicator } from "react-native";
import AuthContext from "../../store/AuthContext";
import { getTasks } from "../../api";
import ListCard from "../../components/ListCard";
import Color from "../../constants/color";
import BaseContainer from "../../components/BaseComponents/BaseContainer";

const ClientTasksScreen = (props) => {
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);

  const { isLoading } = useContext(AuthContext);
  useEffect(() => {
    (async () => {
      const response = await getTasks();
      setTasks([...response.tasks]);
      setLoadingTasks(false);
    })();
  }, []);

  const renderTask = ({ item }) => {
    return (
      <ListCard
        task={item}
        iconName="caret-right"
        onPress={() =>
          props.navigation.navigate("ClientSingleTask", { task: item })
        }
      />
    );
  };

  return (
    <BaseContainer>
      {loadingTasks ? (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color={Color.blue} />
        </View>
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Color.primaryDark,
  },
  preloader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.primaryDark,
  },
});

export default ClientTasksScreen;
