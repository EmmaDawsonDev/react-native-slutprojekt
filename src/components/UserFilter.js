import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Keyboard,
  StyleSheet,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Color from "../constants/color";
import { getUsers } from "../api";

const UserFilter = ({ setUsers }) => {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  const getFilteredUsers = async () => {
    const users = await getUsers(filter, search);
    if (!users) {
      setUsers([]);
    } else {
      setUsers(users);
    }
    Keyboard.dismiss();
  };

  return (
    <View style={styles.wrapper}>
      <TextInput
        onChangeText={(inputText) => {
          setSearch(inputText);
        }}
        value={search}
        style={styles.searchInput}
        placeholder="Search by client name..."
      />
      <RNPickerSelect
        style={{
          inputIOS: styles.searchInput,
          inputAndroid: styles.searchInput,
        }}
        placeholder={{}}
        onValueChange={(value) => setFilter(value)}
        items={[
          { label: "All users", value: "" },
          { label: "Clients", value: "client" },
          { label: "Workers", value: "worker" },
          { label: "Admins", value: "admin" },
        ]}
      />
      <TouchableOpacity onPress={getFilteredUsers} style={styles.searchButton}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: "center",
    backgroundColor: Color.secondaryDark,
    width: "90%",
    borderLeftColor: Color.blue,
    borderLeftWidth: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: "auto",
    height: 190,
    display: "flex",
    justifyContent: "space-between",
    // Border and Shadow ---//
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    // Works only on IOS
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,

    // Works only on Android
    elevation: 5,
  },
  searchInput: {
    backgroundColor: Color.grey,
    height: 40,
    borderRadius: 6,
    paddingLeft: 10,
  },
  searchButton: {
    backgroundColor: Color.blue,
    width: "30%",
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: "flex-end",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    textTransform: "uppercase",
  },
});

export default UserFilter;
