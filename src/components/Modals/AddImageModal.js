import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Modal,
  Text,
  Image,
  Pressable,
  StyleSheet,
  StatusBar,
  Dimensions,
} from "react-native";
import { addImage } from "../../api";
import Color from "../../constants/color";
import TaskContext from "../../store/WorkerTasksContext";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from "expo-image-picker";

const AddImageModal = ({ modalVisible, setModalVisible, task }) => {
  //const { setTasks } = useContext(TaskContext);

  const [image, setImage] = useState(null);

  const imageSize = Dimensions.get("window").width * 0.8;

  useEffect(() => {
    ImagePicker.requestMediaLibraryPermissionsAsync().then((response) => {
      console.log(response);
    });
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({});
    if (!result.cancelled) {
      setImage(result);
    } // Gör så att add image knappen är disabled om status == denied
  };

  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({});
    if (!result.cancelled) {
      setImage(result);
    }
  };

  const handleAddImage = async () => {
    console.log(image);
  };

  const clearAndCloseHandler = () => {
    setImage(null);
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.centeredView}>
      <StatusBar barStyle="light-content" />
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={{ maxWidth: "95%" }}>
            {image && (
              <Image
                source={{ uri: image.uri }}
                style={[
                  styles.imagePreview,
                  { width: imageSize, height: imageSize },
                ]}
              />
            )}
          </View>
          <View style={[styles.modalView, { width: imageSize }]}>
            <View style={styles.buttonContainer}>
              <Pressable style={styles.row} onPress={pickImage}>
                <Icon name="image" size={36} color="white" />
                <Text style={styles.modalText}>Add image from library</Text>
              </Pressable>
              <Pressable style={styles.row} onPress={openCamera}>
                <Icon name="camera" size={36} color="white" />
                <Text style={styles.modalText}>Take a photo</Text>
              </Pressable>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                width: 220,
              }}
            >
              {image && (
                <Pressable
                  style={[styles.button, styles.buttonConfirm]}
                  onPress={handleAddImage} // Anropa API och ändra status
                >
                  <Text style={styles.textStyle}>Add image</Text>
                </Pressable>
              )}
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={clearAndCloseHandler}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    backgroundColor: Color.primaryDark,
  },
  modalView: {
    marginTop: 20,

    backgroundColor: Color.secondaryDark,
    borderRadius: 20,
    paddingHorizontal: 60,
    paddingVertical: 30,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    backgroundColor: "#dedede",
    height: 40,
    borderRadius: 6,
    paddingLeft: 10,
    width: 250,
    marginBottom: 20,
  },
  button: {
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    width: 100,
  },
  buttonConfirm: {
    backgroundColor: Color.blue,
    marginRight: 20,
  },
  buttonCancel: {
    borderWidth: 2,
    borderColor: Color.blue,
    backgroundColor: Color.secondaryDark,
  },
  buttonContainer: {
    height: 100,
    justifyContent: "space-between",
    marginBottom: 30,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    color: "white",
    fontSize: 16,
    marginLeft: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  imagePreview: {
    borderRadius: 10,
  },
});

export default AddImageModal;
