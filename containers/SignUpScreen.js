import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Dimensions } from "react-native";
import { Entypo } from "@expo/vector-icons";
import {
  Text,
  Image,
  TextInput,
  ActivityIndicator,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useState } from "react";
import Constants from "expo-constants";

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [signupError, setSignupError] = useState("");

  const [isSending, setIsSending] = useState(false);
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [confirmPasswordHidden, setConfirmPasswordHidden] = useState(true);

  const handleSignup = async (event) => {
    setIsSending(true);
    event.preventDefault();
    if (!email || !username || !password || !confirmPassword || !description) {
      setSignupError("Please fill all fields");
    } else if (password !== confirmPassword) {
      setSignupError("Passwords not matching");
    } else {
      try {
        const response = await axios.post("https://express-airbnb-api.herokuapp.com/user/sign_up", {
          email: email,
          username: username,
          description: description,
          password: password,
        });
        console.log(response.data);
        setToken(response.data.token);
      } catch (error) {
        console.log(error);
        if (error.response.status === 400) {
          setSignupError("Account already exists");
        } else {
          setSignupError("Access denied");
        }
        console.log(error.message);
      }
    }
    setIsSending(false);
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <SafeAreaView>
        <View style={styles.topContainer}>
          <Image source={require("../assets/img/logo.png")} resizeMode="contain" style={styles.logo} />
          <Text style={styles.textTitle}>Sign up</Text>
        </View>

        <View style={styles.inputsContainer}>
          <TextInput
            autoCapitalize="none"
            style={styles.input}
            placeholder="email"
            onChangeText={(email) => setEmail(email)}
          />
          <TextInput
            autoCapitalize="none"
            style={styles.input}
            placeholder="username"
            onChangeText={(username) => setUsername(username)}
          />
          <TextInput
            multiline={true}
            numberOfLines={4}
            autoCapitalize="none"
            style={styles.textAreaInput}
            placeholder="Describe yourself in a few words ..."
            onChangeText={(description) => setDescription(description)}
          />
          <View style={{ width: "100%" }}>
            <TextInput
              autoCapitalize="none"
              secureTextEntry={passwordHidden && true}
              style={styles.input}
              placeholder="password"
              onChangeText={(password) => setPassword(password)}
            />
            <Entypo
              name="eye"
              size={18}
              style={{ position: "absolute", padding: 5, right: 0, top: 20 }}
              color={passwordHidden ? "#7D7D7D" : "#EB5A62"}
              onPress={() => setPasswordHidden(!passwordHidden)}
            />
          </View>

          <View style={{ width: "100%" }}>
            <TextInput
              autoCapitalize="none"
              secureTextEntry={confirmPasswordHidden && true}
              style={styles.input}
              placeholder="confirm password"
              onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
            />
            <Entypo
              name="eye"
              size={18}
              style={{ position: "absolute", padding: 5, right: 0, top: 20 }}
              color={confirmPasswordHidden ? "#7D7D7D" : "#EB5A62"}
              onPress={() => setConfirmPasswordHidden(!confirmPasswordHidden)}
            />
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <Text style={styles.textError}>{signupError}</Text>
          <TouchableOpacity disabled={isSending} style={styles.buttonSignup} onPress={handleSignup}>
            {isSending ? (
              <ActivityIndicator size="small" color="#EB5A62" />
            ) : (
              <Text style={styles.textSignup}>Sign up</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text style={styles.textToRegister}>Already have an account? Sign in</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const ScreenHeight = Dimensions.get("window").height;

const statusBar = Constants.statusBarHeight;
const topViewHeight = 200;
const bottomViewHeight = 220;
const middleViewHeight = ScreenHeight - (statusBar + topViewHeight + bottomViewHeight);

const buttonHeight = 55;
const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
  //LOGO AND TITLE
  topContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: topViewHeight,
  },
  logo: {
    width: "20%",
    height: 120,
    // backgroundColor: "green",
  },
  textTitle: {
    fontSize: 28,
    fontWeight: "600",
    color: "#7D7D7D",
  },

  // INPUTS TEXT
  inputsContainer: {
    minHeight: middleViewHeight,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  input: {
    marginVertical: 25,
    paddingBottom: 5,
    borderBottomColor: "#FFBAC0",
    borderBottomWidth: 2,
    width: "100%",
  },
  textAreaInput: {
    borderWidth: 2,
    borderColor: "#FFBDC4",
    width: "100%",
    height: 80,
    textAlignVertical: "top",
    paddingLeft: 10,
    paddingTop: 6,
    // paddingLeft: 5,
  },

  // INPUT BUTTONS
  buttonsContainer: {
    height: bottomViewHeight,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonSignup: {
    borderColor: "#F9585E", //TEXT EREUR
    borderWidth: 3,
    borderRadius: buttonHeight / 2,
    height: buttonHeight,
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
  },

  textError: {
    color: "#FA7276",
    marginBottom: 12,
  },

  textSignup: {
    color: "#808080",
    fontSize: 20,
    fontWeight: "600",
  },

  textToRegister: {
    color: "#A6A6A6",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 15,
  },
});
