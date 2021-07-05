import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const Action1DetailComponent = ({ navigation }: any) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Action 1 Detail",
      headerBackTitle: "Back",
    });
  }, [navigation]);

  return (
    <View style={styles.view}>
      <Text>Action 1 List</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Action1DetailComponent;
