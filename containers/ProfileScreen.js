import { Text, View, Button, Image, Dimensions, StyleSheet, TouchableOpacity } from "react-native";

import * as ImagePicker from "expo-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";

export default function ProfileScreen({ setSession, userId }) {
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={styles.profilePicture}>
          {/* <Image source={require("../assets/img/logo.png")} resizeMode="contain" style={styles.logo} />
        <Button
          title="Log Out"
          onPress={() => {
            setSession(null, null);
          }}
        /> */}
          {/* <Text>user id : {userId}</Text> */}
        </View>
        <View style={styles.profileText}></View>
        <View style={styles.updateAndLogout}></View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const statusBar = Constants.statusBarHeight;

const topViewHeight = 200;
const bottomViewHeight = 200;
// const middleViewHeight = screenHeight - (topViewHeight + bottomViewHeight);
const middleViewHeight = screenHeight - (statusBar + topViewHeight + 91 + bottomViewHeight);
const buttonHeight = 55;

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    height: "100%",
    // flex: 1,
  },
  //LOGO AND TITLE
  profilePicture: {
    height: 300,
    width: screenWidth,
    alignItems: "center",
    justifyContent: "center",
    // height: topViewHeight,
    backgroundColor: "blue",
  },
  logo: {
    width: "20%",
    height: 300,
  },

  profileText: {
    // height: middleViewHeight,
    flex: 1,
    height: "100%",
    width: screenWidth,
    backgroundColor: "red",
  },

  updateAndLogout: {
    height: 300,
    width: screenWidth,
    backgroundColor: "green",
  },
  // INPUT BUTTONS
  // buttonsContainer: {
  //   alignItems: "center",
  //   justifyContent: "center",
  //   height: bottomViewHeight,
  // },

  // buttonSignin: {
  //   borderColor: "#F9585E", //TEXT EREUR
  //   borderWidth: 3,
  //   borderRadius: buttonHeight / 2,
  //   height: buttonHeight,
  //   width: "45%",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
});
