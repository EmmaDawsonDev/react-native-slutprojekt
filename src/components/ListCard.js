import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Color from "../constants/color";
import Icon from "react-native-vector-icons/FontAwesome5";

const ListCard = (props) => {
  const styles = StyleSheet.create({
    cardContainer: {
      alignItems: 'center',
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
      fontSize: 20,
    },
    reversed: {
      flexDirection: 'row-reverse',
      justifyContent: 'flex-end'
    },
    icon: {
      minWidth: 40
    }
  });

  return (
    <TouchableOpacity onPress={props.onPress} style={props.iconName === 'caret-right' ? styles.cardContainer : [styles.cardContainer, styles.reversed]}>
      {props.task ? (
        <Text style={styles.cardContent}>{props.task.title}</Text>
      ) : null}
      {props.text ? (
        <Text style={[styles.cardContent, { marginLeft: props.iconName === 'caret-right' ? 0 : 25 }]}>{props.text}</Text>
      ) : null}
      <Icon style={styles.icon} name={props.iconName} size={36} color="white" />
    </TouchableOpacity>
  );
};

export default ListCard;
