import { Button, Text, View } from "react-native";

export default function SettingsScreen({ setToken, data }) {
  return (
    <View>
      <Text>Hello</Text>
      <Text>{data}</Text>

      <Button
        title="Log Out"
        onPress={() => {
          setToken(null);
        }}
      />
    </View>
  );
}
