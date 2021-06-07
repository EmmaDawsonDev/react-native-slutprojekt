import React from "react";
import { View, StyleSheet } from "react-native";
import BaseContainer from "../../components/BaseComponents/BaseContainer";
import BaseFlexRow from "../../components/BaseComponents/BaseFlexRow";
import BaseCard from "../../components/BaseComponents/BaseCard";
import Color from "../../constants/color";

const WorkerSingleTask = ({ route }) => {
  console.log(route.params.task);
  const task = route.params.task;
  return (
    <BaseContainer>
      <View style={styles.imagePlaceholder}></View>
      <BaseFlexRow>
        <BaseCard
          iconName="tasks"
          text={task.title}
          borderColor={Color.blue}
          onPress={() => {
            console.log("task title");
          }}
        ></BaseCard>
        <BaseCard
          iconName={task.done ? "check-circle" : "spinner"}
          text={task.done ? "Done" : "Incomplete"}
          borderColor={task.done ? Color.pelleGreen : Color.red}
          onPress={() => {
            console.log("task status");
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
            console.log("task client");
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
