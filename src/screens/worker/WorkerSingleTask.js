import React, { useState, useCallback, useEffect, useContext } from "react";
import { View, StyleSheet, Image } from "react-native";
import BaseContainer from "../../components/BaseComponents/BaseContainer";
import BaseFlexRow from "../../components/BaseComponents/BaseFlexRow";
import BaseCard from "../../components/BaseComponents/BaseCard";
import Color from "../../constants/color";
import StatusModal from "../../components/Modals/StatusModal";
import TitleModal from "../../components/Modals/TitleModal";
import { getUserById } from "../../api";
import ImageModal from "../../components/Modals/AddImageModal";
import workerTasksContext from '../../store/WorkerTasksContext'

//const HOST = '192.168.10.169' // Pelle
const HOST = '192.168.0.48' //Renzo
// const HOST = "10.0.2.2";

const WorkerSingleTask = ({ route, navigation }) => {
  let task = route.params.task;
  const {tasks} = useContext(workerTasksContext)
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [titleModalVisible, setTitleModalVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);

  const [currentImage, setCurrentImage] = useState(task.Images.length ? task.Images[0].title : null)

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
        setCurrentImage={setCurrentImage}
      />
      <View style={styles.imagePlaceholder}>
        { task.Images.length ? 
        <Image style={styles.image} source={{ uri: `http://${HOST}:5000/${currentImage}` }} ></Image>
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
    height: 200,
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
    width: '100%',
    height: '100%',
  },
});

export default WorkerSingleTask;
