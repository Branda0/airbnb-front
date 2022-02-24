import {
  Dimensions,
  FlatList,
  ActivityIndicator,
  ScrollView,
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

import { SwiperFlatList } from "react-native-swiper-flatlist";

import RatingStars from "../components/RatingStars";
import { FontAwesome } from "@expo/vector-icons";

import { useState, useEffect } from "react";
import axios from "axios";

export default function RoomScreen({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [descriptionShowMore, setDescriptionShowMore] = useState(false);

  //   const ScreenWi = Dimensions.get("window").height;

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${route.params.roomId}`
        );

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
    <ScrollView>
      <View style={{ position: "relative" }}>
        <SwiperFlatList
          // autoplay
          // autoplayDelay={2}
          autoplayLoop
          index={1}
          showPagination
          data={data.photos}
          renderItem={({ item }) => (
            <Image source={{ uri: item.url }} resizeMode="cover" style={styles.roomImg} />
          )}
        />
        <Text style={styles.priceTag}>{data.price} €</Text>
      </View>

      <View style={styles.infoBanner}>
        <View style={styles.left}>
          <Text numberOfLines={1} style={styles.roomTitle}>
            {data.title}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RatingStars rating={data.ratingValue} />
            <Text style={styles.reviews}>{data.reviews} reviews</Text>
          </View>
        </View>
        <Image source={{ uri: data.user.account.photo.url }} style={styles.userImg} resizeMode="cover" />
      </View>
      <View style={styles.description}>
        <Text style={styles.descriptionText} numberOfLines={descriptionShowMore ? 0 : 3}>
          {data.description}
        </Text>
        <TouchableOpacity
          style={styles.showContainer}
          onPress={() => setDescriptionShowMore(!descriptionShowMore)}
        >
          <Text style={styles.showLessOrMore}>{descriptionShowMore ? "Show less" : "Show more"}</Text>
          <FontAwesome name={descriptionShowMore ? "caret-up" : "caret-down"} size={20} color="#717171" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const { width } = Dimensions.get("window");
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
    // width: "%",
    width: width,
    height: 250,
  },
  priceTag: {
    paddingHorizontal: 20,
    paddingVertical: 12,
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
    paddingHorizontal: 15,
    // borderColor: "blue",
    // borderWidth: 3,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#E9E9E9",
    // borderBottomWidth: 1,
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

  //DESCRIPTION BANNER
  description: {
    paddingHorizontal: 15,
  },

  descriptionText: {
    fontSize: 15,
  },

  showContainer: {
    flexDirection: "row",
    marginTop: 8,
    paddingVertical: 5,
    alignItems: "center",
  },

  showLessOrMore: {
    color: "#717171",
    fontSize: 15,
    marginLeft: 0,
    paddingLeft: 0,
    marginRight: 5,
  },
});
