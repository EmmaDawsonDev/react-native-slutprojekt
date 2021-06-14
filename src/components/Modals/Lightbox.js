import React, { useState, useEffect } from "react";
import {
  View,
  Modal,
  Text,
  Animated,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  StatusBar
} from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { HOST } from '../../host.json'
import Color from "../../constants/color";

const Lightbox = ({ modalVisible, setModalVisible, task }) => {
  const imageSize = Dimensions.get("window").width * 0.85;
  const [currentIndex, setCurrentIndex] = useState(0)
  const [uri, setUri] = useState(`http://${HOST}:5000/${task.Images[0].title}`)
  const translateX = new Animated.Value(500)

  const onGestureEvent = new Animated.Event([
    {
      nativeEvent: {
        translationX: translateX,
      }
    }
  ], { useNativeDriver: true })

  useEffect(() => {
    setUri(`http://${HOST}:5000/${task.Images[currentIndex].title}`)
  }, [currentIndex])

  useEffect(() => {
    Animated.spring(translateX, { toValue: 0, duration: 200, useNativeDriver: true }).start()
  })

  const handleStateChange = event => {
    if (event.nativeEvent.oldState == State.ACTIVE) {
      if (event.nativeEvent.translationX < -40) {
        Animated.timing(translateX, { toValue: -350, duration: 100, useNativeDriver: true })
          .start(() => {
            const newIndex = currentIndex + 1
            if (newIndex < task.Images.length) {
              setCurrentIndex((prevState) => prevState + 1)
            } else {
              setCurrentIndex(0)
            }
          })
      } else {
        Animated.spring(translateX, { toValue: 0, duration: 300, useNativeDriver: true }).start()
      }
    }
  }

  const onCloseHandler = () => {
    setCurrentIndex(0)
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
          <View style={styles.modalView}>
            <PanGestureHandler
              onGestureEvent={onGestureEvent}
              onHandlerStateChange={handleStateChange}
            >
              <Animated.Image
                source={{ uri }}
                style={[styles.image, { width: imageSize }, { transform: [{ translateX }] }]}
              />
            </PanGestureHandler>
            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={onCloseHandler}
              >
                <Text style={styles.textStyle}>Close</Text>
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
    margin: 20,
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: 'center',
    maxWidth: "95%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    width: 100,
    marginHorizontal: 10,
  },
  buttonConfirm: {
    backgroundColor: Color.blue,
  },
  buttonCancel: {
    borderWidth: 2,
    borderColor: Color.blue,
    backgroundColor: Color.secondaryDark,
    marginTop: 60
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 5,
    alignSelf: "flex-start",
    color: "white",
    fontSize: 16,
  },
  image: {
    alignSelf: 'center',
    height: 250,
    marginHorizontal: 10
  }
});

export default Lightbox;
