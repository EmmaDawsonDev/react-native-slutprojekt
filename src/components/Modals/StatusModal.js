import React, { useState, useContext } from "react";
import { View, Modal, Text, Pressable, StyleSheet } from "react-native";
import { updateTask } from "../../api";
import Color from "../../constants/color";
import TaskContext from "../../store/WorkerTasksContext";

const StatusModal = ({ modalVisible, setModalVisible, task }) => {
  const { tasks, setTasks } = useContext(TaskContext);

  const [error, setError] = useState(false);

  const handleStatusChange = async () => {
    setError(false);
    let status;
    if (task.done) {
      status = "false";
    } else {
      status = "true";
    }
    const success = await updateTask(task.id, { done: status });
    if (success) {
      task.done = !task.done;
      setTasks(tasks);
      setModalVisible(!modalVisible);
    } else {
      setError(true);
    }
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
            <Text style={styles.modalText}>
              Set status to {task.done ? "incomplete?" : "done?"}
            </Text>

            {error && (
              <Text style={styles.errorMessage}>
                Something went wrong. Please try again
              </Text>
            )}
            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, styles.buttonConfirm]}
                onPress={handleStatusChange}
              >
                <Text style={styles.textStyle}>Yes</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => {
                  setError(false);
                  setModalVisible(!modalVisible);
                }}
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
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "white",
    fontSize: 20,
  },
  errorMessage: {
    color: Color.orange,
    marginVertical: 5,
    fontWeight: "bold",
  },
});

export default StatusModal;
