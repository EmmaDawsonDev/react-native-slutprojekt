import React from "react";
import { View, StyleSheet } from "react-native";
import BaseContainer from "../../components/BaseComponents/BaseContainer";
import BaseFlexRow from "../../components/BaseComponents/BaseFlexRow";
import BaseCard from "../../components/BaseComponents/BaseCard";
import Color from "../../constants/color";

const ClientSingleTask = ({ route }) => {
  console.log(route.params.task);
  const task = route.params.task;
  return (
    <BaseContainer>
      <View style={styles.imagePlaceholder}></View>
      <BaseFlexRow>
        <BaseCard
          iconName="exclamation-circle"
          text="Report error"
          borderColor={Color.blue}
          onPress={() => {
            console.log("error report");
          }}
        ></BaseCard>
        <BaseCard
          iconName="spinner"
          text={task.done ? "Done" : "Incomplete"}
          borderColor={task.done ? Color.pelleGreen : Color.red}
          onPress={() => {
            console.log("task status");
          }}
        ></BaseCard>
      </BaseFlexRow>
      <BaseFlexRow>
        <BaseCard
          iconName="star-half-alt"
          text="Leave review"
          borderColor={Color.pink}
          onPress={() => {
            console.log("review");
          }}
        ></BaseCard>
        <BaseCard
          iconName="hard-hat"
          text="See my contact"
          borderColor={Color.orange}
          onPress={() => {
            console.log("see my contact");
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

export default ClientSingleTask;
