import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";

const PostStack = createStackNavigator();

import Posts from "./Posts";
import Comments from "./Comments";
import Map from "./Map";

const PostsDef = ({ navigation }) => {
  return (
    <PostStack.Navigator>
      <PostStack.Screen
        name="Posts"
        component={Posts}
        options={{
          headerShown: false,
        }}
      />
      <PostStack.Screen
        name="Comments"
        component={Comments}
        options={{
          title: "Коментарі",

          headerStyle: {
            borderBottomWidth: 0.5,
            borderBottomColor: "rgba(0, 0, 0, 0.3)",
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
              color="#rgba(33, 33, 33, 0.8)"
              size={24}
              style={{ marginLeft: 16 }}
              onPress={() => {
                navigation.navigate("Posts");
              }}
            />
          ),
        }}
      />
      <PostStack.Screen
        name="Map"
        component={Map}
        options={{
          title: "Карта",
          headerStyle: {
            borderBottomWidth: 0.5,
            borderBottomColor: "rgba(0, 0, 0, 0.3)",
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
              color="#rgba(33, 33, 33, 0.8)"
              size={24}
              style={{ marginLeft: 16 }}
              onPress={() => {
                navigation.navigate("Posts");
              }}
            />
          ),
        }}
      />
    </PostStack.Navigator>
  );
};

export default PostsDef;
