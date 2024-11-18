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

const Login = () => {
  // const statusHeight = StatusBar.currentHeight
  var areaView = Platform.OS === "android" ? `pt-10` : "0";
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("")

  async function handleSubmit() {
    try {
      // const response = await axios.get("https://official-joke-api.appspot.com/random_joke"
      // )
      // console.log(response);
      
      // alert(response?.data?.punchline)
    
      const data = {
        username,
        password,
      };
      const response = await axios.post(
        "http://192.168.29.7:3000/user/login",
        data
      );
      console.log(response);
      setToken(response?.data?.token)
      
    } catch (e) {
      console.log(e);
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
          <Text>{token}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
