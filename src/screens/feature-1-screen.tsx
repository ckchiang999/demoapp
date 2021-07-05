import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HeaderBackButton } from "@react-navigation/stack";

const Feature1Screen = ({ navigation }: any) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Feature 1",
      headerLeft: () => (
        <HeaderBackButton onPress={() => navigation.goBack()} />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.view}>
      <Text style={styles.viewText}>Feature 1</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  viewText: {
    fontSize: 20,
  },
});

export default Feature1Screen;
