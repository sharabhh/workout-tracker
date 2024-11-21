import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  Button,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
// import { BASE_URL } from "@env";

const Login = () => {
  var areaView = Platform.OS === "android" ? `pt-10` : "0";
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // console.log(BASE_URL);
  const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
  console.log("base url is ",baseUrl);

  async function handleSubmit() {
    try {
      const data = {
        username,
        password,
      };

      if(!username || !password){
        return alert("enter the details")
      }

      const response = await axios.post(`${baseUrl}user/login`, data);

      if (response?.status === 200) {
        const token = response?.data?.token;
        await AsyncStorage.setItem("token", token);
        router.push("/(tabs)/Home");
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e) && e.response) {
        const status = e.response.status;
        if (status === 401 || status === 400) {
          setPassword("");
          alert("incorrect credentials");
        } else if (status === 404) {
          setUserName("");
          setPassword("");
          alert("user doesn't exist");
        } else {
          alert("server side error. Please try later");
        }
      }
    }
  }

  function handleRereouteSignup() {
    router.push("/auth/Signup");
  }

  return (
    <SafeAreaView className={`${areaView} h-full`}>
      <ScrollView
        className=""
        contentContainerClassName="flex justify-center h-full items-center border"
      >
        <View className="w-4/5">
          <Text className="text-3xl text-center pb-4 font-semibold">Login</Text>
          <TextInput
            className="border rounded-xl p-4"
            placeholder="username"
            value={username}
            onChangeText={(text) => setUserName(text)}
          />
          <TextInput
            className="border rounded-xl my-4 p-4"
            secureTextEntry
            placeholder="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <Button title="submit" onPress={handleSubmit} />
        </View>
        <View className="mt-2">
          <Pressable onPress={handleRereouteSignup}>
            <Text className="text-blue-500">Don't have an account? Signup</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
