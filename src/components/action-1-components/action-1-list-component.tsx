import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { HeaderBackButton } from "@react-navigation/stack";

const Action1ListComponent = ({ navigation }: any) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Action 1 List",
      headerShown: true,
      headerBackTitle: "Back",
      headerLeft: () => (
        <HeaderBackButton
          onPress={() => {
            navigation.setOptions({ headerShown: false });
            navigation
              .dangerouslyGetParent()
              .dangerouslyGetParent()
              .setOptions({
                headerShown: true,
              });
            navigation.goBack();
          }}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.view}>
      <Text>Action 1 List</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Action1Detail")}
      />
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

export default Action1ListComponent;
