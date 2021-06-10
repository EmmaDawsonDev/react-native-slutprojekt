import React from "react";
import { View, StyleSheet, Image } from "react-native";
import BaseContainer from "../../components/BaseComponents/BaseContainer";
import BaseFlexRow from "../../components/BaseComponents/BaseFlexRow";
import BaseCard from "../../components/BaseComponents/BaseCard";
import Color from "../../constants/color";

const ClientSingleTask = ({ route, navigation }) => {
  const task = route.params.task;
  return (
    <BaseContainer>
      <View style={styles.imagePlaceholder}>
        <Image
          style={styles.image}
          source={require("../../assets/houses.png")}
        />
      </View>
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
            navigation.navigate("SingleUser", {
              userId: task.workerId,
            });
          }}
        ></BaseCard>
      </BaseFlexRow>
    </BaseContainer>
  );
};

const styles = StyleSheet.create({
  imagePlaceholder: {
    overflow: "hidden",
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
  image: {
    width: 350,
    height: 100,
  },
});

export default ClientSingleTask;
