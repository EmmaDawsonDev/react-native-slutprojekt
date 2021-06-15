import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Color from "../../constants/color";

const BaseContainer = (props) => {
  return (
    <SafeAreaView style={[styles.screen, props.style]}>
      {props.children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Color.primaryDark,
    position: "relative",
  },
});

export default BaseContainer;
