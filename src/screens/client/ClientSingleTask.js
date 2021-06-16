import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Pressable, Alert } from "react-native";
import BaseContainer from "../../components/BaseComponents/BaseContainer";
import BaseFlexRow from "../../components/BaseComponents/BaseFlexRow";
import BaseCard from "../../components/BaseComponents/BaseCard";
import Color from "../../constants/color";
import LightboxView from "../../components/Modals/LightboxView";
import { HOST } from "../../host.json";

const ClientSingleTask = ({ route, navigation }) => {
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const task = route.params.task;
  const uri = task.Images.length
    ? `http://${HOST}:5000/${task.Images[0].title}`
    : null;

  useEffect(() => {
    navigation.setOptions({ title: task.title });
  }, [task]);

  return (
    <>
      <BaseContainer>
        <View style={styles.imagePlaceholder}>
          {task.Images.length ? (
            <Pressable onPress={() => setLightboxVisible(true)}>
              <Image style={styles.image} source={{ uri }}></Image>
            </Pressable>
          ) : (
            <Image
              style={styles.placeholderImage}
              source={require("../../assets/houses.png")}
            />
          )}
        </View>
        <BaseFlexRow>
          <BaseCard
            iconName="exclamation-circle"
            text="Report error"
            borderColor={Color.blue}
            onPress={() => {
              Alert.alert(
                "Report an error",
                "This feature is not yet available"
              );
            }}
          ></BaseCard>
          <BaseCard
            iconName={task.done ? "check-circle" : "spinner"}
            text={task.done ? "Done" : "Incomplete"}
            borderColor={task.done ? Color.pelleGreen : Color.red}
            onPress={() => {
              const message = task.done
                ? "It's over.."
                : "We are working on it";
              Alert.alert("Current status", message);
            }}
          ></BaseCard>
        </BaseFlexRow>
        <BaseFlexRow>
          <BaseCard
            iconName="star-half-alt"
            text="Leave review"
            borderColor={Color.pink}
            onPress={() => {
              Alert.alert(
                "Leave a review",
                "This feature is not yet available"
              );
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
      {lightboxVisible && (
        <LightboxView setModalVisible={setLightboxVisible} task={task} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  imagePlaceholder: {
    width: "85%",
    height: 160,
    backgroundColor: Color.secondaryDark,
    alignSelf: "center",
    marginVertical: 20,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
    justifyContent: "center",
  },
  image: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
  },
  placeholderImage: {
    width: "100%",
    height: "80%",
    alignSelf: "center",
  },
});

export default ClientSingleTask;
