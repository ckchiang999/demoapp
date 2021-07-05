/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from "react";
import { LogBox } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import EncryptedStorage from "react-native-encrypted-storage";

import routes from "./src/navigation/routes";
import { AuthState } from "./src/models/authentication/auth-state";
import { AuthConstant } from "./src/constants/authentication/auth-constants";
import { AuthContext } from "./src/contexts/auth-context";
import * as authService from "./src/services/authentication-service";
import { User } from "./src/models/authentication/user";

LogBox.ignoreLogs(["Require cycle:", "Remote debugger"]);

const Drawer = createDrawerNavigator();

const App = () => {
  const reducer = (prevState: any, action: any) => {
    switch (action.type) {
      case AuthConstant.RESTORE_TOKEN:
        console.info(
          `Moved to RESTORE_TOKEN state. prevState: ${JSON.stringify(
            prevState,
          )}`,
        );
        return {
          ...prevState,
          isLoading: false,
          userToken: action.token,
        } as AuthState;
      case AuthConstant.LOG_IN:
        console.info(
          `Moved to LOG_IN state.  prevState: ${JSON.stringify(prevState)}`,
        );
        return {
          ...prevState,
          isSignout: false,
          userToken: action.token,
        } as AuthState;
      case AuthConstant.LOG_OUT:
        console.info(
          `Moved to LOG_OUT state.  prevState: ${JSON.stringify(prevState)}`,
        );
        return {
          ...prevState,
          isSignout: true,
          userToken: null,
        } as AuthState;
    }
  };

  const initialState = {
    isLoading: true,
    isSignout: false,
    userToken: null,
  } as AuthState;

  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken: string | null = null;

      try {
        userToken = await EncryptedStorage.getItem(AuthConstant.USER_TOKEN);
        if (userToken === undefined) {
          console.info("user token undefined");
        } else if (userToken === null) {
          console.info("user token null");
        } else {
          console.info(`user token: ${userToken}`);
        }
        await new Promise(resolve => setTimeout(resolve, 2000)); // simulate 2 seconds of loading
      } catch (error) {
        // Restoring token failed
        console.log(error.code);
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: AuthConstant.RESTORE_TOKEN, token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      login: async (username: string, password: string): Promise<boolean> => {
        const response = await authService.authenticate(username, password);
        if (response !== null) {
          const userToken = JSON.stringify(response);
          await EncryptedStorage.setItem(AuthConstant.USER_TOKEN, userToken);
          dispatch({ type: AuthConstant.LOG_IN, token: userToken });
          return true;
        } else {
          return false;
        }
      },
      logout: async () => {
        await EncryptedStorage.removeItem(AuthConstant.USER_TOKEN);
        console.info("removed user token");
        dispatch({ type: AuthConstant.LOG_OUT });
      },
      currentUser: (): User | null => {
        if (state?.userToken === undefined || state?.userToken === null) {
          return null;
        }
        const user = JSON.parse(state?.userToken) as User;
        console.log(`currentUser: ${user.userName}`);
        return user;
      },
    }),
    [state],
  );

  const getScreens = (): any => {
    if (state?.isLoading) {
      console.log("getScreens: show loading screen");
      return routes.loadingScreen;
    } else if (state?.userToken === undefined || state?.userToken === null) {
      console.log("getScreens: userToken is null or undefined");
      return routes.authScreens;
    } else {
      console.log("getScreens: has valid token");
      const user = authContext.currentUser();
      const screens = user?.id ? routes.featureScreens : routes.authScreens;
      return screens;
    }
  };

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{ headerTitleAlign: "center" }}
          drawerContent={props => {
            return (
              <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem
                  label="Log out"
                  onPress={async () => {
                    props.navigation.closeDrawer();
                    await authContext.logout();
                  }}
                />
              </DrawerContentScrollView>
            );
          }}>
          {[...getScreens()].map(screen => (
            <Drawer.Screen
              key={screen.key}
              name={screen.name}
              component={screen.component}
              options={screen.options}
            />
          ))}
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
export default App;
