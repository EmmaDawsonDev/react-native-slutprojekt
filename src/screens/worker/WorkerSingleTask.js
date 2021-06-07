import React, { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import BaseContainer from "../../components/BaseComponents/BaseContainer";
import BaseFlexRow from "../../components/BaseComponents/BaseFlexRow";
import BaseCard from "../../components/BaseComponents/BaseCard";
import Color from "../../constants/color";
import StatusModal from "../../components/Modals/StatusModal";
import TitleModal from "../../components/Modals/TitleModal";
import { getUserById } from '../../api'

const WorkerSingleTask = ({ route, navigation }) => {
  const task = route.params.task;
  const [user, setUser] = useState(null)

  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [titleModalVisible, setTitleModalVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);

  const handleGetUser = useCallback(async () => {

    const response = await getUserById(task.clientId)
    setUser(response)
  })

  return (
    <BaseContainer>
      <StatusModal
        modalVisible={statusModalVisible}
        setModalVisible={setStatusModalVisible}
        task={task}
      />
      <TitleModal
        modalVisible={titleModalVisible}
        setModalVisible={setTitleModalVisible}
        task={task}
      />


      <View style={styles.imagePlaceholder}></View>
      <BaseFlexRow>
        <BaseCard
          iconName="tasks"
          text={task.title}
          borderColor={Color.blue}
          onPress={() => {
            console.log("task title");
            setTitleModalVisible(true);
          }}
        ></BaseCard>
        <BaseCard
          iconName={task.done ? "check-circle" : "spinner"}
          text={task.done ? "Done" : "Incomplete"}
          borderColor={task.done ? Color.pelleGreen : Color.red}
          onPress={() => {
            console.log("task status");
            setStatusModalVisible(true);
          }}
        ></BaseCard>
      </BaseFlexRow>
      <BaseFlexRow>
        <BaseCard
          iconName="camera"
          text="Change Image"
          borderColor={Color.pink}
          onPress={() => {
            console.log("add image");
          }}
        ></BaseCard>
        <BaseCard
          iconName="user"
          text="See client info"
          borderColor={Color.orange}
          onPress={() => {
            handleGetUser()
            navigation.navigate("SingleUser", {
              userId: task.clientId,
              user
            })
          }}
        ></BaseCard>
      </BaseFlexRow>
    </BaseContainer>
  );
};

const styles = StyleSheet.create({
  imagePlaceholder: {
    width: "90%",
    height: 100,
    backgroundColor: "yellow",
    alignSelf: "center",
    marginBottom: 20,
  },
});

export default WorkerSingleTask;
