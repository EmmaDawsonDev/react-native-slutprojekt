import React, { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import BaseContainer from "../../components/BaseComponents/BaseContainer";
import BaseFlexRow from "../../components/BaseComponents/BaseFlexRow";
import BaseCard from "../../components/BaseComponents/BaseCard";
import Color from "../../constants/color";
import StatusModal from "../../components/Modals/StatusModal";
import TitleModal from "../../components/Modals/TitleModal";
import { getUserById } from "../../api";
import ImageModal from "../../components/Modals/AddImageModal";

const WorkerSingleTask = ({ route, navigation }) => {
  const task = route.params.task;

  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [titleModalVisible, setTitleModalVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);

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
      <ImageModal
        modalVisible={imageModalVisible}
        setModalVisible={setImageModalVisible}
        task={task}
      />
      <View style={styles.imagePlaceholder}></View>
      <BaseFlexRow>
        <BaseCard
          iconName="tasks"
          text={task.title}
          borderColor={Color.blue}
          onPress={() => {
            setTitleModalVisible(true);
          }}
        ></BaseCard>
        <BaseCard
          iconName={task.done ? "check-circle" : "spinner"}
          text={task.done ? "Done" : "Incomplete"}
          borderColor={task.done ? Color.pelleGreen : Color.red}
          onPress={() => {
            setStatusModalVisible(true);
          }}
        ></BaseCard>
      </BaseFlexRow>
      <BaseFlexRow>
        <BaseCard
          iconName="camera"
          text="Add image"
          borderColor={Color.pink}
          onPress={() => {
            setImageModalVisible(true);
          }}
        ></BaseCard>
        <BaseCard
          iconName="user"
          text="See client info"
          borderColor={Color.orange}
          onPress={() => {
            navigation.navigate("SingleUser", {
              userId: task.clientId,
            });
          }}
        ></BaseCard>
      </BaseFlexRow>
    </BaseContainer>
  );
};

const styles = StyleSheet.create({
  imagePlaceholder: {
    width: "85%",
    height: 100,
    backgroundColor: Color.secondaryDark,
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
  },
});

export default WorkerSingleTask;
