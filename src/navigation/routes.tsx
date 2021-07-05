import Feature1Screen from "../screens/feature-1-screen";
import Feature2Screen from "../screens/feature-2-screen";
import HomeNavScreen from "../screens/home-nav-screen";
import LoginScreen from "../screens/login-screen";
import LoadingScreen from "../screens/loading-screen";

const authScreens = [
  {
    key: "Login",
    name: "Login",
    component: LoginScreen,
    options: {
      headerShown: false,
      title: "Login",
    },
  },
];

const loadingScreen = [
  {
    key: "Loading",
    name: "Loading",
    component: LoadingScreen,
    options: {
      headerShown: false,
      title: "Loading",
    },
  },
];

const featureScreens = [
  {
    key: "HomeNav",
    name: "HomeNav",
    component: HomeNavScreen,
    options: {
      headerShown: true,
      title: "Home",
    },
  },
  {
    key: "Feature1",
    name: "Feature 1",
    component: Feature1Screen,
    options: {
      headerShown: true,
      title: "Feature 1",
    },
  },
  {
    key: "Feature2",
    name: "Feature 2",
    component: Feature2Screen,
    options: {
      headerShown: true,
      title: "Feature 2",
    },
  },
];

export default {
  authScreens: authScreens,
  featureScreens: featureScreens,
  loadingScreen: loadingScreen,
};
