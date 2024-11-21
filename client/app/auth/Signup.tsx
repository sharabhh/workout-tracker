import {
  View,
  Text,
  SafeAreaView,
  Platform,
  Button,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "expo-router";
import { BASE_URL } from "@env";

const Login = () => {
  var areaView = Platform.OS === "android" ? `pt-10` : "0";
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // console.log(BASE_URL);
  const baseUrl = BASE_URL;
  console.log(baseUrl);

  async function handleSubmit() {
    try {
      const data = {
        username,
        password,
      };

      if(!username || !password){
        return alert("enter the details")
      }

      const response = await axios.post(`${baseUrl}user/signup`, data);

      if (response?.status === 201) {
        alert("account created");
        router.push("/auth/Login");
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e) && e.response) {
        const status = e.response.status;
        if (status === 400) {
          setUserName("");
          setPassword("");
          alert("incorrect credentials");
        } else if (status === 409) {
          setUserName("");
          setPassword("");
          alert("user already exist");
        } else{

        }
      } else {
          alert("server side error. Please try later");
        }
      }
    }
  

  function handleRereouteLogin() {
    router.push("/auth/Login");
  }

  return (
    <SafeAreaView className={`${areaView} h-full`}>
      <ScrollView
        className=""
        contentContainerClassName="flex justify-center h-full items-center border"
      >
        <View className="w-4/5">
          <Text className="text-3xl text-center pb-4 font-semibold">
            Signup
          </Text>
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
          <Pressable onPress={handleRereouteLogin}>
            <Text className="text-blue-500">
              Already have an account? Login
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
