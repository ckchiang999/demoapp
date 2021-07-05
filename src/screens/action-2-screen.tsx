import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HeaderBackButton } from "@react-navigation/stack";

const Action2Screen = ({ navigation }: any) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Action 2",
      headerShown: true,
      headerLeft: () => (
        <HeaderBackButton
          onPress={() => {
            navigation.setOptions({ headerShown: false });
            navigation.dangerouslyGetParent().setOptions({
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
      <Text>Action 2</Text>
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

export default Action2Screen;
