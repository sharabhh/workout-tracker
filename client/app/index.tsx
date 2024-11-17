import { View, Text, Button } from "react-native";
import { Link } from "expo-router";
// import Signup from '../auth/Signup';

export default function HomeScreen() {
  return (
    <View className="flex justify-center items-center h-full w-full bg-pink-100">
      <Text>hello there</Text>
      <Link href="/(tabs)/Home">click here</Link>
    </View>
  );
}
