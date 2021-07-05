import Action1Screen from "../screens/action-1-screen";
import Action2Screen from "../screens/action-2-screen";

const actionScreens = [
  {
    key: "Action1",
    name: "Action1",
    component: Action1Screen,
    displayName: "Action 1",
  },
  {
    key: "Action2",
    name: "Action2",
    component: Action2Screen,
    displayName: "Action 2",
  },
];

export default {
  actionScreens: actionScreens,
};
