import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginForm from "../screens/Auth/LoginScreen";
import RegistrationForm from "../screens/Auth/RegistrationScreen";
import Home from "../screens/Home/Home";

const AuthStack = createStackNavigator();

const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginForm}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegistrationForm}
        />
      </AuthStack.Navigator>
    );
  }
  return <Home />;
};

export default useRoute;
