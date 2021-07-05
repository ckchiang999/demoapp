import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Action1ListComponent from "../components/action-1-components/action-1-list-component";
import Action1DetailComponent from "../components/action-1-components/action-1-detail-component";

const Stack = createStackNavigator();

const Action1Screen = () => {
  return (
    <Stack.Navigator
      initialRouteName="Action1List"
      screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen name="Action1List" component={Action1ListComponent} />
      <Stack.Screen name="Action1Detail" component={Action1DetailComponent} />
    </Stack.Navigator>
  );
};

export default Action1Screen;
