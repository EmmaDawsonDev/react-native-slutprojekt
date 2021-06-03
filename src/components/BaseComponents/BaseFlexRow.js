import React from "react";
import { View, StyleSheet } from "react-native";

const BaseFlexRow = (props) => {
  return <View style={styles.flex}>{props.children}</View>;
};

const styles = StyleSheet.create({
  flex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginBottom: 30,
  },
});

export default BaseFlexRow;
