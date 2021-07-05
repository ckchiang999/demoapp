import "react-native";
import React from "react";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react-native";
import { AuthContext } from "../../contexts/auth-context";
import { IAuthContext } from "../../contexts/auth-context-interface";

import LoginScreen from "../login-screen";

describe("LoginScreen", () => {
  it("should render", () => {
    const tree = renderer.create(<LoginScreen />).toJSON();
    // Compare to the snapshot of the rendered output
    expect(tree).toMatchSnapshot();
  });

  it("should contain a login button", async () => {
    const authContext = {
      login: (_username: string, _password: string) => {
        return Promise.resolve(true);
      },
      logout: () => {
        return Promise.resolve();
      },
      currentUser: () => {
        return null;
      },
    } as IAuthContext;

    const authContextSpy = jest.spyOn(authContext, "login");

    const component = (
      <AuthContext.Provider value={authContext}>
        <LoginScreen />
      </AuthContext.Provider>
    );
    const renderApi = render(component);
    const title = await renderApi.findByText("Login");
    const loginButton = await renderApi.findByTestId("LoginButton");

    expect(title).toBeTruthy();
    expect(loginButton).toBeTruthy();

    fireEvent(loginButton, "press");
    expect(authContextSpy).toHaveBeenCalled();
  });
});
