import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Color from "../../constants/color";
import Icon from "react-native-vector-icons/FontAwesome5";

//dynamiska variabler via props: iconName, Text, borderColor
const BaseCard = ({ iconName, text, borderColor, onPress }) => {
  const styles = StyleSheet.create({
    card: {
      backgroundColor: Color.secondaryDark,
      height: 160,
      width: 160,
      justifyContent: "center",
      alignItems: "center",

      //-- BordeRadiusr and Shadow ---//
      borderTopRightRadius: 8,
      borderTopLeftRadius: 8,
      shadowColor: "black",
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
      shadowOpacity: 0.26,
      elevation: 5,

      borderBottomWidth: 10,
      borderBottomColor: borderColor, // from props
    },
    cardText: {
      color: "white",
      marginTop: 30,
    },
  });
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Icon name={iconName} size={36} color="white" />
      <Text style={styles.cardText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default BaseCard;
