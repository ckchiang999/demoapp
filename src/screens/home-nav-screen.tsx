import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import routes from "../navigation/action-routes";
import HomeScreen from "./home-screen";

const Stack = createStackNavigator();

const HomeNavScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      {routes.actionScreens.map(task => (
        <Stack.Screen
          key={task.key}
          name={task.name}
          component={task.component}
          options={{ headerShown: false }}
        />
      ))}
    </Stack.Navigator>
  );
};

export default HomeNavScreen;
