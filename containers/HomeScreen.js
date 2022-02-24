import {
  Dimensions,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
  ImageBackground,
} from "react-native";

import RatingStars from "../components/RatingStars";

//import { useNavigation } from "@react-navigation/core";
import { useState, useEffect } from "react";
import axios from "axios";

export default function HomeScreen({ navigation }) {
  // const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get("https://express-airbnb-api.herokuapp.com/rooms");

        setData(response.data);
        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log({ error: error.message });
    }
  }, []);

  return isLoading ? (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" color="#F9585E" />
    </View>
  ) : (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.roomCard}
              onPress={() => navigation.navigate("Room", { roomId: item._id })}
            >
              <ImageBackground source={{ uri: item.photos[0].url }} resizeMode="cover" style={styles.roomImg}>
                <Text style={styles.priceTag}>{item.price} €</Text>
              </ImageBackground>
              <View style={styles.infoBanner}>
                <View style={styles.left}>
                  <Text numberOfLines={1} style={styles.roomTitle}>
                    {item.title}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <RatingStars rating={item.ratingValue} />
                    <Text style={styles.reviews}>{item.reviews} reviews</Text>
                  </View>
                </View>
                <Image
                  source={{ uri: item.user.account.photo.url }}
                  style={styles.userImg}
                  resizeMode="cover"
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: "white",
    marginBottom: -11,
  },
  roomCard: {
    marginVertical: 10,
  },

  //TOP OF CARD - PHOTOS + PRICE
  roomImg: {
    width: "100%",
    height: 200,
  },
  priceTag: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "black",
    color: "#FFFFFF",
    fontSize: 25,
    // height: "20%",
    position: "absolute",
    bottom: "6%",
    left: 0,
    textAlign: "center",
  },

  //BOTTOM BANNER OF CARD - TITLE + RATING + USERPHOTO
  infoBanner: {
    paddingVertical: 10,
    // borderColor: "blue",
    // borderWidth: 3,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#E9E9E9",
    borderBottomWidth: 1,
  },

  left: {
    flex: 3,
    marginRight: 5,
  },
  roomTitle: {
    marginBottom: 15,
    fontSize: 20,
  },

  reviews: {
    fontSize: 15,
    color: "#BEBEBE",
    marginLeft: 5,
  },

  userImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});
