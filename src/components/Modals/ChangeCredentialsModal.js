import React, { useState, useContext } from "react";
import { useEffect } from "react";
import {
  View,
  Modal,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import { updateCredentials } from "../../api";
import Color from "../../constants/color";
import AuthContext from "../../store/AuthContext";

const ChangeCredentialsModal = ({
  modalVisible,
  setModalVisible,
  credential,
  user,
}) => {
  const { updateUser } = useContext(AuthContext);

  const [newValue, setNewValue] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setNewValue(user[credential]);
  }, [credential]);

  const clearAndClose = () => {
    setModalVisible(false);
  };

  const handleOnSubmit = async () => {
    setError(false);
    const response = await updateCredentials(credential, newValue);
    if (!response) {
      setError(true);
    } else {
      user[credential] = newValue;
      updateUser(user);
      setModalVisible(false);
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
            <Text style={styles.modalText}>{`Change ${credential}`}</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setNewValue(text)}
              value={newValue}
            />
            {error && (
              <Text style={styles.errorMessage}>
                Couldn't update {credential}
              </Text>
            )}
            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, styles.buttonConfirm]}
                onPress={handleOnSubmit}
              >
                <Text style={styles.textStyle}>Submit</Text>
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
    marginTop: 40,
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
  input: {
    backgroundColor: "#dedede",
    height: 40,
    borderRadius: 6,
    paddingLeft: 10,
    width: 250,
  },
  errorMessage: {
    color: Color.orange,
    marginTop: 20,
    fontWeight: "bold",
  },
});

export default ChangeCredentialsModal;
