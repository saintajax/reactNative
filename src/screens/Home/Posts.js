import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const Posts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params.state]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(_, i) => i.toString()}
        renderItem={(el) => {
          return (
            <View style={styles.postWrapper}>
              <Image source={{ uri: el.item.photo }} style={styles.img} />
              <Text style={styles.postName}>{el.item.name}</Text>
              <View style={styles.buttonsWrapper}>
                <TouchableOpacity
                  style={{ ...styles.commentsBtn, flex: 0.2 }}
                  onPress={() => navigation.navigate("Comments")}
                >
                  <Text style={{ ...styles.text, textAlign: "left" }}>
                    <Feather name="message-circle" size={24} color="#BDBDBD" />
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ ...styles.commentsBtn }}
                  onPress={() =>
                    navigation.navigate("Map", {
                      location: el.item.coords,
                    })
                  }
                >
                  <Text
                    style={{
                      ...styles.text,
                      textDecorationLine: "underline",
                    }}
                  >
                    <AntDesign name="enviromento" size={24} color="#BDBDBD" />
                    {el.item.name}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Posts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  postWrapper: {
    marginTop: 32,
    marginHorizontal: 10,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  img: {
    width: "100%",
    aspectRatio: 343 / 240,
    marginBottom: 8,
    borderRadius: 8,
  },
  postName: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
  },
  buttonsWrapper: {
    height: 30,
    flexDirection: "row",
    marginTop: 8,
    alignItems: "center",
  },
  commentsBtn: { height: 24, textAlign: "left" },
  text: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
});
