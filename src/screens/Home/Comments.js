import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Dimensions,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from "react-native";
import { db } from "../../../friebase/config";
import {
  doc,
  updateDoc,
  arrayUnion,
  onSnapshot,
  addDoc,
  collection,
  query,
  getDocs,
} from "firebase/firestore";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";

const Comments = ({ route }) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState("");
  const idPost = route.params.postId;
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [dimensions, setDimension] = useState(Dimensions.get("window").width);
  const login = useSelector((state) => state.auth.login);
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setDimension(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener?.("change", onChange);
    };
  }, []);

  useEffect(() => {
    getAllComments();
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const createComments = async () => {
    const result = {
      userId,
      userName: login,
      comment,
      dateComment: Date.now(),
    };

    const docRef = doc(db, "posts", `${idPost}`);
    await addDoc(collection(docRef, "comments"), result);

    keyboardHide();
    setComment("");
  };

  const getAllComments = async () => {
    const onSnapshot = await getDocs(
      collection(db, "posts", `${idPost}`, "comments")
    );
    const result = [];
    onSnapshot.forEach((doc) => {
      result.push(doc.data());
    });
    setAllComments(result);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          ...styles.container,
        }}
      >
        <SafeAreaView>
          {allComments.length > 0 && (
            <FlatList
              data={allComments}
              keyExtractor={(item) => item.dateComment.toString()}
              renderItem={({ item }) => {
                const newDate = new Date(item.dateComment);
                const date = newDate.toLocaleString();
                return (
                  <View style={styles.commentTextWrapper}>
                    <Text style={styles.commentText}>{item.comment}</Text>
                    <Text style={styles.commentDate}>
                      {` ${item.userName} => ${date} `}
                    </Text>
                  </View>
                );
              }}
            />
          )}
        </SafeAreaView>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}>
          <View
            style={{
              marginBottom: isShowKeyboard ? 130 : 16,
            }}
          >
            <TextInput
              style={styles.input}
              placeholder={"Коментувати..."}
              placeholderTextColor={"#BDBDBD"}
              onFocus={() => setIsShowKeyboard(true)}
              onChangeText={(value) => {
                setComment(value);
              }}
              value={comment}
            />
            <TouchableOpacity
              onPress={createComments}
              activeOpacity={0.7}
              style={styles.inputBtn}
            >
              <Feather name="arrow-up" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Comments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    marginHorizontal: 16,
    justifyContent: "space-between",
  },

  input: {
    height: 50,
    width: "100%",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#212121",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    borderRadius: 100,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    marginBottom: 10,
    paddingLeft: 16,
  },
  inputBtn: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  commentTextWrapper: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    padding: 16,
    borderRadius: 6,
    marginTop: 5,
  },
  commentText: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
    marginBottom: 8,
  },
  commentDate: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 12,
    textAlign: "right",
    color: "rgba(189, 189, 189, 1)",
  },
});
