import React, { useContext, useState } from "react";
import {
  View,
  Modal,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import { addTask } from "../../api";
import Color from "../../constants/color";
import TaskContext from "../../store/WorkerTasksContext";

const AddTaskModal = ({ modalVisible, setModalVisible }) => {
  const { setTasks } = useContext(TaskContext);

  const [taskTitle, setTaskTitle] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const addTaskHandler = async () => {
    setError(false);
    if (!taskTitle.length || !email.length) {
      return;
    }
    const payload = { title: taskTitle, clientEmail: email };
    const updatedTasks = await addTask(payload);

    if (updatedTasks) {
      setTasks(updatedTasks.tasks);
      setModalVisible(!modalVisible);
    } else {
      setError(true);
    }
  };

  const clearAndCloseHandler = () => {
    setEmail("");
    setTaskTitle("");
    setError(false);
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.centeredView}>
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
            <Text style={styles.modalText}>Task title</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setTaskTitle(text)}
              value={taskTitle}
            />
            <Text style={styles.modalText}>Client email</Text>
            <TextInput
              style={styles.input}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
              value={email}
              keyboardType="email-address"
            />

            {error && (
              <Text style={styles.errorMessage}>
                Something went wrong. Please try again
              </Text>
            )}

            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, styles.buttonConfirm]}
                onPress={addTaskHandler}
              >
                <Text style={styles.textStyle}>Add task</Text>
              </Pressable>
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
    margin: 20,
    backgroundColor: Color.secondaryDark,
    borderRadius: 20,
    padding: 60,
    alignItems: "center",
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
    marginHorizontal: 10,
  },
  buttonConfirm: {
    backgroundColor: Color.blue,
  },
  buttonCancel: {
    borderWidth: 2,
    borderColor: Color.blue,
    backgroundColor: Color.secondaryDark,
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
  errorMessage: {
    color: Color.orange,
    marginVertical: 5,
    fontWeight: "bold",
  },
});

export default AddTaskModal;
