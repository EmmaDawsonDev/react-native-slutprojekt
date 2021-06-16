import React, { useState, useEffect } from "react";
import { View, Pressable, StyleSheet, Image, Alert } from "react-native";
import BaseContainer from "../../components/BaseComponents/BaseContainer";
import BaseFlexRow from "../../components/BaseComponents/BaseFlexRow";
import BaseCard from "../../components/BaseComponents/BaseCard";
import Color from "../../constants/color";
import StatusModal from "../../components/Modals/StatusModal";
import TitleModal from "../../components/Modals/TitleModal";
import ImageModal from "../../components/Modals/AddImageModal";
import LightboxView from "../../components/Modals/LightboxView";

import { HOST } from "../../host.json";

const WorkerSingleTask = ({ route, navigation }) => {
  let task = route.params.task;

  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [titleModalVisible, setTitleModalVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const [allowed, setAllowed] = useState(false);

  const [currentImage, setCurrentImage] = useState(
    task.Images.length ? task.Images[0].title : null
  );

  useEffect(() => {
    navigation.setOptions({ title: task.title });
  }, [task]);

  return (
    <>
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
          navigation={navigation}
        />
        <ImageModal
          modalVisible={imageModalVisible}
          setModalVisible={setImageModalVisible}
          task={task}
          setCurrentImage={setCurrentImage}
          setAllowed={setAllowed}
        />
        <View style={styles.imagePlaceholder}>
          {currentImage ? (
            <Pressable onPress={() => setLightboxVisible(true)}>
              <Image
                style={styles.image}
                source={{ uri: `http://${HOST}:5000/${currentImage}` }}
              ></Image>
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
              allowed
                ? setImageModalVisible(true)
                : Alert.alert("You need to allow access to your images");
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
      {lightboxVisible && (
        <LightboxView setModalVisible={setLightboxVisible} task={task} worker />
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

export default WorkerSingleTask;
