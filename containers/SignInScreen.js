import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Dimensions } from "react-native";
import { Entypo } from "@expo/vector-icons";
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useState } from "react";
import Constants from "expo-constants";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signinError, setSigninError] = useState("");

  const [isSending, setIsSending] = useState(false);
  const [passwordHidden, setPasswordHidden] = useState(true);

  const handleSignin = async (event) => {
    setIsSending(true);
    console.log("YEAH");
    event.preventDefault();
    if (!email || !password) {
      setSigninError("Please fill all fields");
    } else {
      try {
        const response = await axios.post("https://express-airbnb-api.herokuapp.com/user/log_in", {
          email: email,
          password: password,
        });
        setToken(response.data.token);
      } catch (error) {
        if (error.response.status === 400) {
          setSigninError("Missing parameters");
        } else if (error.response.status === 401) {
          setSigninError("Access denied");
        }
      }
    }
    setIsSending(false);
    console.log("end");
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <SafeAreaView>
        <View style={styles.topContainer}>
          <Image source={require("../assets/img/logo.png")} resizeMode="contain" style={styles.logo} />
          <Text style={styles.textTitle}>Sign in</Text>
        </View>

        <View style={styles.inputsContainer}>
          <TextInput
            autoCapitalize="none"
            style={styles.input}
            placeholder="email"
            onChangeText={(email) => setEmail(email)}
          />
          <View style={{ width: "100%" }}>
            <TextInput
              autoCapitalize="none"
              secureTextEntry={passwordHidden && true}
              style={[styles.input, { position: "relative" }]}
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
        </View>

        <View style={styles.buttonsContainer}>
          <Text style={styles.textError}>{signinError}</Text>
          <TouchableOpacity disabled={isSending} style={styles.buttonSignin} onPress={handleSignin}>
            {isSending ? (
              <ActivityIndicator size="small" color="#EB5A62" />
            ) : (
              <Text style={styles.textSignin}>Sign in</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.textToRegister}>No account ? Register</Text>
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
    // flex: 1,
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

  // INPUT BUTTONS
  buttonsContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: bottomViewHeight,
  },

  buttonSignin: {
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
    // backgroundColor: "green",
    marginBottom: 12,
  },

  textSignin: {
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
