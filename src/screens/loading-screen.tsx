import React from "react";
import { StyleSheet, Text, View } from "react-native";

const SplashScreen = () => {
  return (
    <View style={styles.view}>
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    elevation: 5,
  },
});

export default SplashScreen;
