import { View, Text, Button, Platform, StatusBar, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
// import Signup from '../auth/Signup';

const paddingTop =
  Platform.OS === "android" && StatusBar.currentHeight
    ? Math.ceil(StatusBar.currentHeight)
    : 0;
export default function HomeScreen() {
  
  return (
    <SafeAreaView className="flex justify-center items-center h-full w-full bg-pink-100" style={style.container}>
      <Text>hello there</Text>
      <Link href="/(tabs)/Home">click here</Link>
      <Link href="/auth/Login">Login</Link>
      <Link href="/(tabs)/Home">Home</Link>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container:{
    paddingTop: paddingTop
  }
})