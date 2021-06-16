import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  Animated,
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import {
  PanGestureHandler,
  PinchGestureHandler,
  State,
} from "react-native-gesture-handler";
import { deleteImage } from "../../api";
import { HOST } from "../../host.json";
import Color from "../../constants/color";
import Icon from "react-native-vector-icons/FontAwesome5";
import { getTasks } from "../../api";
import TaskContext from "../../store/WorkerTasksContext";

const Lightbox = ({ setModalVisible, taskId, setCurrentImage, worker }) => {
  const imageSize = Dimensions.get("window").width * 0.85;
  const [currentIndex, setCurrentIndex] = useState(0);

  const [taskImages, setTaskImages] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [uri, setUri] = useState(
    taskImages.length ? `http://${HOST}:5000/${taskImages[0].title}` : null
  );

  const { tasks, setTasks } = useContext(TaskContext);

  useEffect(() => {
    let task = tasks.find((item) => item.id === taskId);
    setTaskImages([...task.Images]);
  }, [tasks]);

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

  const scale = new Animated.Value(1);

  const onPinchGestureEvent = new Animated.event([{ nativeEvent: { scale } }], {
    useNativeDriver: true,
  });

  const onPinchHandlerStateChange = (event) => {
    Platform.OS === "ios" ? setIsVisible(false) : null;
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        bounciness: 1,
      }).start();
      setIsVisible(true);
    }
  };

  useEffect(() => {
    taskImages.length &&
      setUri(`http://${HOST}:5000/${taskImages[currentIndex].title}`);
  }, [taskImages, currentIndex]);

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
        if (currentIndex < taskImages.length - 1) {
          setCurrentIndex((prevState) => prevState + 1);
        } else {
          setCurrentIndex(0);
        }
        translateX.setValue(500);
        Animated.spring(translateX, {
          toValue: 0,
          duration: 200,
          bounciness: 1,
          useNativeDriver: true,
        }).start();
      } else if (event.nativeEvent.translationX > 200) {
        if (currentIndex > 0) {
          setCurrentIndex((prevState) => prevState - 1);
        } else {
          setCurrentIndex(taskImages.length - 1);
        }
        translateX.setValue(-500);
        Animated.spring(translateX, {
          toValue: 0,
          duration: 200,
          bounciness: 1,
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

  const deleteImageHandler = () => {
    Alert.alert("Delete image", "Are you sure?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          const success = await deleteImage(taskImages[currentIndex].id);
          if (success) {
            const response = await getTasks();
            setTasks(() => [...response.tasks]);
            if (taskImages.length > 1) {
              setCurrentIndex(0);
            } else {
              onCloseHandler();
            }
          }
        },
      },
    ]);
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
            style={[
              styles.imageContainer,
              { position: "relative", transform: [{ translateX }] },
            ]}
          >
            {worker && isVisible && (
              <Pressable style={styles.deleteBtn} onPress={deleteImageHandler}>
                <Icon
                  style={styles.icon}
                  name="trash-alt"
                  size={20}
                  color="black"
                />
              </Pressable>
            )}
            <PinchGestureHandler
              onGestureEvent={onPinchGestureEvent}
              onHandlerStateChange={onPinchHandlerStateChange}
            >
              <Animated.Image
                source={{ uri }}
                style={[
                  styles.image,
                  { width: imageSize },
                  { transform: [{ scale }] },
                ]}
              />
            </PinchGestureHandler>
          </Animated.View>
        </PanGestureHandler>
        {isVisible && (
          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, styles.buttonCancel]}
              onPress={onCloseHandler}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        )}
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
    borderRadius: 10,
  },
  imageContainer: {
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,

    // Works only on Android
    elevation: 5,
  },
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
