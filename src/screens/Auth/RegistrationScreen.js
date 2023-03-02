import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  Dimensions,
  TouchableWithoutFeedback,
  ImageBackground,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import { authSignUpUser } from "../redux/auth/operations";

const initialState = {
  login: "",
  email: "",
  password: "",
};

const LoginForm = ({ navigation }) => {
  const [dataForm, setDataForm] = useState(initialState);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const dispatch = useDispatch();

  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;
      setDimensions(width);
    };
    const subscription = Dimensions.addEventListener("change", onChange);
    return () => {
      subscription?.remove();
    };
  }, []);

  const hideKyeboard = () => {
    setIsKeyboardVisible(false);
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    setIsKeyboardVisible(false);
    Keyboard.dismiss();
    dispatch(authSignUpUser(dataForm));
    console.log(dataForm);
    setDataForm(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={hideKyeboard}>
      <ImageBackground
        source={require("../../image/bg.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <Image
            style={styles.avatar}
            source={{
              uri: "https://reactnative.dev/img/tiny_logo.png",
            }}
          />
          <View
            style={{
              ...styles.form,
              marginBottom: isKeyboardVisible ? 32 : 78,
              width: dimensions,
            }}
          >
            <Text style={styles.titleText}>Реєстрація</Text>
            <TextInput
              style={styles.input}
              placeholder="Логін"
              onChangeText={(value) =>
                setDataForm((prevState) => ({ ...prevState, login: value }))
              }
              value={dataForm.login}
              keyboardType="default"
              onFocus={() => setIsKeyboardVisible(true)}
              autoCapitalize="none"
              placeholderTextColor="#BDBDBD"
              autoComplete="off"
            />
            <TextInput
              style={styles.input}
              placeholder="Адреса електронної пошти"
              onChangeText={(value) =>
                setDataForm((prevState) => ({ ...prevState, email: value }))
              }
              value={dataForm.email}
              keyboardType="email-address"
              onFocus={() => setIsKeyboardVisible(true)}
              autoCapitalize="none"
              placeholderTextColor="#BDBDBD"
            />
            <TextInput
              style={styles.input}
              placeholder="Пароль"
              onChangeText={(value) =>
                setDataForm((prevState) => ({
                  ...prevState,
                  password: value,
                }))
              }
              value={dataForm.password}
              secureTextEntry={true}
              onFocus={() => setIsKeyboardVisible(true)}
              placeholderTextColor="#BDBDBD"
            />
            <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
              <Text style={styles.textBtn}>Зареєструватись</Text>
            </TouchableOpacity>
            <Text style={{ ...styles.text }}>
              Вже є акаунт?
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={{ marginLeft: 4 }}>Увійти</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },

  container: {
    backgroundColor: "#fff",
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    alignItems: "center",
  },

  avatar: {
    width: 120,
    height: 120,
    marginTop: -60,
    borderRadius: 16,
  },

  form: {
    marginTop: 32,
    marginBottom: 78,
  },

  titleText: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    fontWeight: 500,
    textAlign: "center",
    marginBottom: 33,
  },

  input: {
    height: 50,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 15,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: 400,
  },

  btn: {
    height: 50,
    marginHorizontal: 16,
    marginTop: 27,
    marginBottom: 16,
    justifyContent: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },

  textBtn: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: 400,
  },

  text: {
    textAlign: "center",
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: 400,
  },
});
