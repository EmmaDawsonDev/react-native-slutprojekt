import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Color from "../constants/color";
import Icon from "react-native-vector-icons/FontAwesome5";

const ListCard = (props) => {
  const styles = StyleSheet.create({
    cardContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 30,
      paddingHorizontal: 34,
      width: "90%",
      alignSelf: "center",
      backgroundColor: Color.secondaryDark,
      borderLeftWidth: 10,
      borderLeftColor: props.task ? props.task.done ? Color.pelleGreen : Color.red : Color.blue,
      marginTop: 20,
      //-- Border and Shadow ---//
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
    cardContent: {
      display: "flex",
      color: "white",
      fontSize: 24,
    },
  });
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.cardContainer}>
      {props.task ? (
        <Text style={styles.cardContent}>{props.task.title}</Text>
      ) : null}
      {props.user ? (
        <Text style={styles.cardContent}>{props.user.name}</Text>
      ) : null}
      <Icon name="caret-right" size={36} color="white" />
    </TouchableOpacity>
  );
};

export default ListCard;
