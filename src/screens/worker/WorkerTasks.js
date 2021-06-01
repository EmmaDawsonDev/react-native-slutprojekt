import React, { useContext, useState, useEffect } from "react";
import { SafeAreaView, Text, Button, FlatList } from "react-native";
import AuthContext from "../../store/AuthContext";
import {getTasks} from "../../api"

const WorkerTasksScreen = (props) => {
  const [tasks, setTasks] = useState([ ])

  const { user } = useContext(AuthContext);
  useEffect( () => {
    (async () => {
      const response = await getTasks(user.token)
      console.log(response);
      setTasks(response.tasks)
      
    })()
  },[])

  const renderTask = ({item}) => {
    return (
    <Text onPress={() => props.navigation.navigate("WorkerSingleTask", {task:item})}> 
      {item.title} 
    </Text>)
  }

  return (
    <SafeAreaView>
      <FlatList
        keyExtractor={task => task.id}
        data={tasks}
        renderItem={renderTask}
      />
    </SafeAreaView>
  );
};

export default WorkerTasksScreen