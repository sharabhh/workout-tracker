import {
  Button,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
} from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const paddingTop =
  Platform.OS === "android" && StatusBar.currentHeight
    ? Math.ceil(StatusBar.currentHeight)
    : 0;
export default function HomeScreen() {
  return (
    <SafeAreaView
      className="flex justify-center items-center h-full w-full bg-white"
      style={style.container}
    >
      <Text className="text-3xl font-bold mb-8">Welcome to FitLogger!</Text>
      <Link href="/auth/Login" className="px-8 py-4 bg-blue-500 rounded-xl"><Text className="text-white font-semibold">Login</Text></Link>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    paddingTop: paddingTop,
  },
});
