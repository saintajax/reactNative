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
} from "react-native";
import { useDispatch } from "react-redux";
import { authSignInUser } from "../redux/auth/operations";

const initialState = {
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
    dispatch(authSignInUser(dataForm));
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
          <View
            style={{
              ...styles.form,
              marginBottom: isKeyboardVisible ? 32 : 144,
              width: dimensions,
            }}
          >
            <Text style={styles.titleText}>Увійти</Text>
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
              <Text style={styles.textBtn}>Увійти</Text>
            </TouchableOpacity>
            <Text style={styles.text}>
              Немає акаунта?
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={{ marginLeft: 4 }}>Зареєструватися</Text>
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

  titleText: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    fontWeight: 500,
    textAlign: "center",
    marginBottom: 33,
  },

  form: {
    marginTop: 32,
    marginBottom: 144,
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
