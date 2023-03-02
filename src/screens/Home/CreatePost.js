import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "../../../friebase/config";

const initialState = {
  name: "",
  location: "",
  coords: {},
  photo: "",
};

const CreatePost = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const { userId, login } = useSelector((state) => state.auth);

  Camera.requestCameraPermissionsAsync();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const takePhoto = async () => {
    try {
      const photo = await camera.takePictureAsync();
      setPhoto(photo.uri);
      setState((prevState) => ({ ...prevState, photo: photo.uri }));
    } catch (error) {
      console.log(error);
    }
  };

  const takeLocation = async () => {
    try {
      let position = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = position.coords;
      const coords = { latitude, longitude };
      setState((prevState) => ({
        ...prevState,
        coords,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const uploadPhotoToServer = async () => {
    try {
      const response = await fetch(photo);
      const file = await response.blob();
      const uniquePostId = Date.now().toString();
      const pathPhoto = `postImage/${uniquePostId}.jpg`;
      const photoRef = ref(storage, pathPhoto);
      const uploadPhoto = await uploadBytes(photoRef, file, {
        contentType: "image/jpeg",
      });
      const processedPhoto = await getDownloadURL(uploadPhoto.ref);
      return processedPhoto;
    } catch (error) {
      console.log(error);
    }
  };

  const uploadPostToServer = async () => {
    try {
      const photoUrl = await uploadPhotoToServer();

      const docRef = await addDoc(collection(db, "posts"), {
        photoUrl,
        location: state.location,
        coords: state.coords,
        name: state.name,
        userId,
        login,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const sendPost = async () => {
    await uploadPostToServer();
    navigation.navigate("Posts");
    setState(initialState);
  };

  const deletePost = () => {
    setState(initialState);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}>
          <View style={styles.container}>
            <Camera style={styles.camera} ref={setCamera}>
              <View style={styles.takePhotoContainer}>
                <Image source={{ uri: photo }} style={styles.photo} />
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  takePhoto();
                  takeLocation();
                }}
              >
                <MaterialIcons name="photo-camera" size={20} color="#fff" />
              </TouchableOpacity>
            </Camera>
          </View>
          {!photo ? (
            <Text style={styles.uploadText}>Завантажте фото</Text>
          ) : (
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.uploadText}>Редагувати фото</Text>
            </TouchableOpacity>
          )}
          <View style={styles.inpuWrapper}>
            <TextInput
              style={{
                ...styles.inputTitle,
                marginTop: isShowKeyboard ? 20 : 48,
              }}
              placeholder="Назва..."
              placeholderTextColor={{
                color: "#BDBDBD",
              }}
              onFocus={() => setIsShowKeyboard(true)}
              onChangeText={(value) =>
                setState((prevState) => ({
                  ...prevState,
                  name: value,
                }))
              }
              value={state.name}
            />
          </View>
          <View style={styles.inpuWrapper}>
            <View style={{ position: "absolute", bottom: 16 }}>
              <AntDesign name="enviromento" size={24} color="#BDBDBD" />
            </View>
            <TextInput
              style={{ ...styles.inputTitle, marginLeft: 32, marginTop: 32 }}
              placeholder="Місцевість..."
              placeholderTextColor={{
                color: "#BDBDBD",
              }}
              onFocus={() => setIsShowKeyboard(true)}
              onChangeText={(value) =>
                setState((prevState) => ({
                  ...prevState,
                  location: value,
                }))
              }
              value={state.location}
            />
          </View>
          <View style={styles.btnPublish}>
            <TouchableOpacity
              style={{
                ...styles.btnPublish,
                backgroundColor:
                  !photo || !state.name || !state.location
                    ? "#F6F6F6"
                    : "#FF6C00",
              }}
              activeOpacity={0.7}
              onPress={() => {
                sendPost();
              }}
            >
              <Text
                style={{
                  ...styles.textBtn,
                  color:
                    !photo || !state.name || !state.location
                      ? "#BDBDBD"
                      : "#FFFFFF",
                }}
              >
                Опублікувати
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center", paddingTop: 120 }}>
            <TouchableOpacity
              style={{
                width: 70,
                height: 40,
                backgroundColor: "#F6F6F6",
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={deletePost}
            >
              <AntDesign name="delete" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    justifyContent: "center",
    borderRadius: 8,
  },
  camera: {
    width: "100%",
    borderRadius: 8,
    aspectRatio: 343 / 240,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  takePhotoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  uploadText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    paddingLeft: 16,
    marginTop: 8,
  },
  inpuWrapper: {
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    marginHorizontal: 16,
    position: "relative",
  },
  inputTitle: {
    marginBottom: 15,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  btnPublish: {
    width: "90%",
    height: 51,
    borderRadius: 100,
    marginTop: 32,
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(246, 246, 246, 1)",
  },
  textBtn: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
});
