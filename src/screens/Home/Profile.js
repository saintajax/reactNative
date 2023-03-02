import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../../friebase/config";
import { useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const { userId } = useSelector((state) => state.auth);
  console.log(posts);
  const getUserPosts = async () => {
    const q = query(
      collection(db, "posts"),
      where("userId", "==", `${userId}`)
    );
    const querySnapshot = await getDocs(q);
    const result = [];
    querySnapshot.forEach((doc) => {
      const post = { ...doc.data(), idPost: doc.id };
      result.push(post);
    });

    setPosts(result);
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        {posts.length > 0 && (
          <FlatList
            data={posts}
            keyExtractor={(item) => item.idPost}
            renderItem={({ item }) => {
              return (
                <View style={styles.wrapper}>
                  <Image source={{ uri: item.photoUrl }} style={styles.img} />
                  <Text style={styles.text}>{item.name}</Text>
                  <Text>{item.location} </Text>
                </View>
              );
            }}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 40,
    border: 2,
    borderColor: "black",
    borderRadius: 8,
    marginBottom: 5,
    alignItems: "center",
    backgroundColor: "grey",
  },
  text: {},
  img: {
    width: 40,
    height: 40,
  },
});
