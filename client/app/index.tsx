import { View, Text, Button } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
// import Signup from '../auth/Signup';

export default function HomeScreen() {
  
  return (
    <SafeAreaView className="flex justify-center items-center h-full w-full bg-pink-100">
      <Text>hello there</Text>
      <Link href="/(tabs)/Home">click here</Link>
      <Link href="/auth/Login">Login</Link>
      <Link href="/(tabs)/Home">Home</Link>
    </SafeAreaView>
  );
}
