import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import useRoute from "../hooks/router";
import { useSelector, useDispatch } from "react-redux";
import { authStateChangeUser } from "../screens/redux/auth/operations";

const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const dispach = useDispatch();

  const routing = useRoute(stateChange);

  useEffect(() => {
    dispach(authStateChangeUser());
  }, []);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
