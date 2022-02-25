import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Dimensions, ActivityIndicator, View, StyleSheet } from "react-native";
import * as Location from "expo-location";

import { useState, useEffect } from "react";
import axios from "axios";

export default function AroundMeScreen({ navigation, route }) {
  const [data, setData] = useState();
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isLocationAuthorized, setIsLocationAuthorized] = useState(false);
  //   const [coords, setCoords] = useState([]);

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  useEffect(() => {
    const getPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status === "granted") {
          //Récupérer les coordonnées GPS
          const location = await Location.getCurrentPositionAsync();

          //GET DATA AFTER LOCATION PERMIT
          try {
            const response = await axios.get(
              `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
            );

            setData(response.data);
            setIsDataLoading(false);
          } catch (error) {
            console.log({ error: error.message });
          }

          //   setCoords([location.coords.longitude, location.coords.latitude]);
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
          setIsLocationAuthorized(true);
        } else {
          alert("Permission Refusée !");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getPermission();
  }, []);

  return isDataLoading || !isLocationAuthorized ? (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" color="#F9585E" />
    </View>
  ) : (
    <MapView
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.2,
      }}
      showsUserLocation={true}
      style={styles.map}
    >
      {data.map((item, index) => {
        return (
          <MapView.Marker
            onPress={() => {
              navigation.navigate("RoomFromMap", { roomId: item._id });
            }}
            key={index}
            coordinate={{
              latitude: item.location[1],
              longitude: item.location[0],
            }}
          />
        );
      })}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    height: "100%",
    width: "100%",
  },
});
