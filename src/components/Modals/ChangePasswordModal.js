import React, { useState, useContext } from "react";

import {
  View,
  Modal,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import { updatePassword } from "../../api";
import Color from "../../constants/color";
import AuthContext from "../../store/AuthContext";

const ChangePasswordModal = ({ modalVisible, setModalVisible, user }) => {
  const { signOut } = useContext(AuthContext);

  const [newValue, setNewValue] = useState("");
  const [confirmValue, setConfirmValue] = useState("");
  const [error, setError] = useState(false);

  const clearAndClose = () => {
    setModalVisible(false);
  };

  const handleOnSubmit = async () => {
    setError(false);
    const response = await updatePassword(newValue, confirmValue);
    if (!response) {
      setError(true);
    } else {
      setModalVisible(false);
      signOut();
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
            <Text style={styles.modalText}>New password</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setNewValue(text)}
              value={newValue}
            />
            <Text style={styles.modalText}>Confirm new password</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setConfirmValue(text)}
              value={confirmValue}
            />
            {error && (
              <Text style={styles.errorMessage}>Couldn't update password</Text>
            )}
            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, styles.buttonConfirm]}
                onPress={handleOnSubmit} // Anropa API och ändra status
              >
                <Text style={styles.textStyle}>Submit and sign out</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={clearAndClose}
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
    justifyContent: "center",
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    width: 250,
    marginVertical: 5,
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
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 20,
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
  input: {
    backgroundColor: "#dedede",
    height: 40,
    borderRadius: 6,
    paddingLeft: 10,
    width: 250,
    marginBottom: 20,
  },
  errorMessage: {
    color: Color.orange,
    marginTop: 20,
    fontWeight: "bold",
  },
});

export default ChangePasswordModal;
