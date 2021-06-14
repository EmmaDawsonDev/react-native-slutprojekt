import React, { useState, useCallback, useEffect, useContext } from "react";
import { View, Pressable, StyleSheet, Image, Alert } from "react-native";
import BaseContainer from "../../components/BaseComponents/BaseContainer";
import BaseFlexRow from "../../components/BaseComponents/BaseFlexRow";
import BaseCard from "../../components/BaseComponents/BaseCard";
import Color from "../../constants/color";
import StatusModal from "../../components/Modals/StatusModal";
import TitleModal from "../../components/Modals/TitleModal";
import { getUserById } from "../../api";
import ImageModal from "../../components/Modals/AddImageModal";
import Lightbox from "../../components/Modals/Lightbox";
import workerTasksContext from '../../store/WorkerTasksContext'

const HOST = '192.168.10.170' // Pelle
// const HOST = '192.168.0.48' //Renzo
// const HOST = "10.0.2.2";

const WorkerSingleTask = ({ route, navigation }) => {
  let task = route.params.task;
  const { tasks } = useContext(workerTasksContext)
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [titleModalVisible, setTitleModalVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const [allowed, setAllowed] = useState(false)

  const [currentImage, setCurrentImage] = useState(task.Images.length ? task.Images[0].title : null)

  return (
    <BaseContainer>
      <Lightbox
        modalVisible={lightboxVisible}
        setModalVisible={setLightboxVisible}
        task={task}
      />
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
        setCurrentImage={setCurrentImage}
        setAllowed={setAllowed}
      />
      <View style={styles.imagePlaceholder}  >

        {currentImage ?
          <Pressable onPress={() => setLightboxVisible(true)}>
            <Image style={styles.image} source={{ uri: `http://${HOST}:5000/${currentImage}` }} ></Image>
          </Pressable>
          :
          <Image
            style={styles.image}
            source={require("../../assets/houses.png")}
          />
        }
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
            allowed ? setImageModalVisible(true) : Alert.alert('You need to allow access to your images')
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
    width: "90%",
    height: 160,
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
    borderRadius: 10,
    width: '100%',
    height: '100%',
  },
});

export default WorkerSingleTask;
