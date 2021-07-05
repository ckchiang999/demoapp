import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { AuthContext } from "../contexts/auth-context";
import { IAuthContext } from "../contexts/auth-context-interface";

const LoginScreen = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [userFocused, setUserFocused] = React.useState(false);
  const [passwordFocused, setPasswordFocused] = React.useState(false);
  const [authenticating, setAuthenticating] = React.useState(false);

  const authContext = React.useContext(AuthContext) as IAuthContext;

  const login = async () => {
    setAuthenticating(true);
    const success = await authContext.login(username, password);
    if (!success) {
      setErrorMessage("Failed to Login");
      setAuthenticating(false);
    }
  };

  return (
    <View style={styles.view}>
      <ActivityIndicator
        size="large"
        color="#BA55D3"
        animating={authenticating}
      />
      <Text style={styles.loginTitle}>Login</Text>
      <TextInput
        style={userFocused ? styles.focusedTextbox : styles.textbox}
        autoCapitalize="none"
        placeholder="Username"
        value={username}
        editable={!authenticating}
        onChangeText={setUsername}
        onFocus={() => setUserFocused(true)}
        onBlur={() => setUserFocused(false)}
      />
      <TextInput
        style={passwordFocused ? styles.focusedTextbox : styles.textbox}
        autoCapitalize="none"
        autoCompleteType="password"
        placeholder="Password"
        value={password}
        editable={!authenticating}
        onChangeText={setPassword}
        onFocus={() => setPasswordFocused(true)}
        onBlur={() => setPasswordFocused(false)}
        secureTextEntry
      />
      <Pressable
        style={styles.loginButton}
        onPress={() => login()}
        disabled={authenticating}>
        <Text style={styles.loginText} testID="LoginButton">
          LOGIN
        </Text>
      </Pressable>
      <Text style={styles.authFailure}>{errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    elevation: 5,
    paddingTop: "50%",
  },
  loginTitle: {
    fontSize: 30,
    fontWeight: "600",
    marginTop: 50,
    marginBottom: 50,
  },
  textbox: {
    fontSize: 20,
    textAlign: "left",
    width: "80%",
    borderWidth: 1,
    margin: 5,
    padding: 5,
    borderColor: "#E3E3E3",
  },
  focusedTextbox: {
    fontSize: 20,
    textAlign: "left",
    width: "80%",
    borderWidth: 2,
    margin: 5,
    padding: 5,
    borderColor: "#6495ED",
  },
  loginButton: {
    margin: 10,
    padding: 5,
    backgroundColor: "#007AFF",
    color: "#FFFFFF",
    width: "80%",
    borderRadius: 20,
  },
  loginText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 20,
  },
  authFailure: {
    color: "red",
  },
});

export default LoginScreen;
