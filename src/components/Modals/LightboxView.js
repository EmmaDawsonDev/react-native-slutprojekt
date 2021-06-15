import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Animated,
  Dimensions,
  Image,
  Pressable,
  StyleSheet
} from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { HOST } from "../../host.json";
import Color from "../../constants/color";
import Icon from "react-native-vector-icons/FontAwesome5";

const Lightbox = ({ setModalVisible, task, worker }) => {
  const imageSize = Dimensions.get("window").width * 0.85;
  const [currentIndex, setCurrentIndex] = useState(0);

  const [uri, setUri] = useState(
    task.Images.length ? `http://${HOST}:5000/${task.Images[0].title}` : null
  );

  let translateX = useRef(new Animated.Value(500)).current;

  const onGestureEvent = new Animated.Event(
    [
      {
        nativeEvent: {
          translationX: translateX,
        },
      },
    ],
    { useNativeDriver: true }
  );

  useEffect(() => {
    task.Images.length &&
      setUri(`http://${HOST}:5000/${task.Images[currentIndex].title}`);
  }, [currentIndex]);

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  });

  const handleStateChange = (event) => {
    if (event.nativeEvent.oldState == State.ACTIVE) {
      if (event.nativeEvent.translationX < -200) {
        if (currentIndex < task.Images.length - 1) {
          setCurrentIndex((prevState) => prevState + 1);
        } else {
          setCurrentIndex(0);
        }
        translateX.setValue(500);
        Animated.timing(translateX, {
          toValue: 30,
          duration: 200,
          useNativeDriver: true,
        }).start();
      } else if (event.nativeEvent.translationX > 200) {
        if (currentIndex > 0) {
          setCurrentIndex((prevState) => prevState - 1);
        } else {
          setCurrentIndex(task.Images.length - 1);
        }
        translateX.setValue(-500);
        Animated.timing(translateX, {
          toValue: -30,
          duration: 200,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.spring(translateX, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  const onCloseHandler = () => {
    setCurrentIndex(0);
    setModalVisible(false);
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={handleStateChange}
        >
          <Animated.View
            style={{ position: "relative", transform: [{ translateX }] }}
          >
            {worker && (
              <View style={styles.deleteBtn}>
                <Icon
                  style={styles.icon}
                  name="trash-alt"
                  size={20}
                  color="black"
                />
              </View>
            )}
            <Image
              source={{ uri }}
              style={[styles.image, { width: imageSize }]}
            />
          </Animated.View>
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
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    backgroundColor: Color.primaryDark,
    zIndex: 1000,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "95%",
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
    marginTop: 60,
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
    alignSelf: "center",
    height: 250,
    marginHorizontal: 10,
  },
  icon: {},
  deleteBtn: {
    backgroundColor: "rgba(255,255,255,0.7)",
    height: 40,
    width: 40,
    borderRadius: 100,
    position: "absolute",
    top: 7,
    right: 20,
    zIndex: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Lightbox;
