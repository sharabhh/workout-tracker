import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  Button,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import {BASE_URL} from "@env"

const Login = () => {
  var areaView = Platform.OS === "android" ? `pt-10` : "0";
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // console.log(BASE_URL);
  const baseUrl = BASE_URL
  console.log(baseUrl);
  
  async function handleSubmit() {
    try {
      const data = {
        username,
        password,
      };
      
      const response = await axios.post(
        `${baseUrl}user/login`,
        data
      );

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
        }
        if (status === 404) {
          setUserName("");
          setPassword("");
          alert("user doesn't exist");
        }
      }
    }
  }

  return (
    <SafeAreaView className={`${areaView} h-full`}>
      <ScrollView
        className=""
        contentContainerClassName="flex justify-center h-full items-center border"
      >
        <View className="w-4/5">
          <Text className="text-3xl text-center pb-4">Login</Text>
          <TextInput
            className="border rounded-xl"
            placeholder="username"
            value={username}
            onChangeText={(text) => setUserName(text)}
          />
          <TextInput
            className="border rounded-xl my-4"
            secureTextEntry
            placeholder="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <Button title="submit" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
