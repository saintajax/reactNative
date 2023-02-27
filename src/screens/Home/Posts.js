import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Posts = () => {
  return (
    <View style={styles.container}>
      <Text>Posts</Text>
    </View>
  );
};

export default Posts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
