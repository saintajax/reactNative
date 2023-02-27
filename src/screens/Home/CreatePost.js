import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CreatePost = () => {
  return (
    <View style={styles.container}>
      <Text>CreatePost</Text>
    </View>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
