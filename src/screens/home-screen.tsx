import React, { createRef } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import ActionSheet from "react-native-actions-sheet";

import routes from "../navigation/action-routes";
import { AuthContext } from "../contexts/auth-context";
import { IAuthContext } from "../contexts/auth-context-interface";

const actionSheetRef = createRef<ActionSheet>();

const HomeScreen = ({ navigation }: any) => {
  const authContext = React.useContext(AuthContext) as IAuthContext;
  const currentUser = authContext.currentUser();

  return (
    <View style={styles.view}>
      <Text style={styles.viewText}>
        Home Screen{"\n"}
        You're logged in as {currentUser?.name}
      </Text>
      <TouchableOpacity
        style={styles.fabTouchable}
        onPress={() => {
          actionSheetRef.current?.setModalVisible();
        }}
        activeOpacity={0.8}>
        <FontAwesome5
          name="plus-circle"
          size={60}
          color="#BA55D3"
          style={styles.fabIcon}
        />
      </TouchableOpacity>
      <ActionSheet ref={actionSheetRef} containerStyle={styles.actionSheet}>
        {routes.actionScreens.map(task => (
          <Pressable
            key={task.key}
            style={styles.taskView}
            onPress={() => {
              actionSheetRef.current?.setModalVisible(false);
              navigation
                .dangerouslyGetParent()
                .setOptions({ headerShown: false });
              navigation.navigate(task.name);
            }}>
            <Text style={styles.task}>{task.displayName}</Text>
          </Pressable>
        ))}
      </ActionSheet>
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
    textAlign: "center",
    fontSize: 20,
  },
  fabTouchable: {
    position: "absolute",
    bottom: 35,
  },
  fabIcon: {
    textShadowColor: "#d3d3d3",
    textShadowRadius: 0,
    borderRadius: 50,
    elevation: 28,
  },
  actionSheet: {
    borderRadius: 0,
    minHeight: 100,
    bottom: 35,
  },
  taskView: {
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e2e2",
  },
  task: {
    fontSize: 18,
  },
});

export default HomeScreen;
