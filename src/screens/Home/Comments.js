import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Comments = () => {
  return (
    <View style={styles.container}>
      <Text>Comments</Text>
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
