import React, { useContext } from "react";
import { SafeAreaView, Text, Button } from "react-native";
import AuthContext from "../../store/AuthContext";

const ClientTasksScreen = (props) => {
  const { signOut } = useContext(AuthContext);
  // useEffect med API-call, får tasks
  return (
    <SafeAreaView>
      {/* // Lista med singleTasks, skickar task som prop */}
      <Text>CLIENT TASKS</Text>
      <Button
        onPress={() => props.navigation.navigate("ClientSingleTask")}
        title="First task"
      ></Button>
      <Button
        onPress={() => {
          signOut();
        }}
        title="sign out"
      />
    </SafeAreaView>
  );
};

export default ClientTasksScreen;
