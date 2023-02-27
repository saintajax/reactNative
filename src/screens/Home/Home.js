import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { AntDesign, Feather } from "@expo/vector-icons";

const MainTab = createBottomTabNavigator();

import Posts from "./Posts";
import Profile from "./Profile";
import CreatePost from "./CreatePost";

const Home = ({ navigation, route }) => {
  return (
    <MainTab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "Roboto-Medium",
          fontSize: 17,
          lineHeight: 22,
        },
        headerStyle: {
          backgroundColor: "#ffffff",
          borderBottomWidth: 0.5,
          borderBottomColor: "#21212120",
        },
        screenOptions: {
          tabBarHideOnKeyboard: true,
        },
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
      }}
    >
      <MainTab.Screen
        name="Posts"
        component={Posts}
        options={({ route }) => {
          const activeRoute = getFocusedRouteNameFromRoute(route);
          return {
            tabBarIcon: ({ focused, size, color }) => (
              <AntDesign name="appstore-o" size={size} color={color} />
            ),
            title: "Публікації",
            headerTitleStyle: {
              fontFamily: "Roboto-Medium",
              color: "#212121",
              fontSize: 17,
              lineHeight: 22,
            },
            headerRight: () => (
              <Feather
                name="log-out"
                color="#BDBDBD"
                size={24}
                style={{ marginRight: 10 }}
              />
            ),
          };
        }}
      />
      <MainTab.Screen
        name="CreatePost"
        component={CreatePost}
        options={{
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ focused, size, color, navigation }) => (
            <View
              style={{
                width: 70,
                height: 40,
                backgroundColor: "#FF6C00",
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Feather name="plus" size={size} color={"#fff"} />
            </View>
          ),
          title: "Створити публікацію",
          headerStyle: {
            borderBottomWidth: 0.5,
            borderBottomColor: "#212121CC",
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            color: "#212121",
            fontSize: 17,
            lineHeight: 22,
          },
          headerLeft: () => (
            <Feather
              name="arrow-left"
              color="#212121CC"
              size={24}
              style={{ marginLeft: 16 }}
              onPress={() => {
                navigation.navigate("Posts");
              }}
            />
          ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

export default Home;