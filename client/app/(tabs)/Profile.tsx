import {
  View,
  Text,
  Platform,
  StatusBar,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icons from "@/constants/Icons";
import Button from "@/components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "@env";
import { userType } from "../types/typescriptTypes";

const Profile = () => {
  const [user, setUser] = useState<userType | null>();
  const [loading, setLoading] = useState(true);
  const paddingTop =
    Platform.OS === "android" && StatusBar.currentHeight
      ? Math.ceil(StatusBar.currentHeight)
      : 0;

  async function handlePress() {
    const token = await AsyncStorage.removeItem("token");
    console.log(token);
    alert("deleted");
  }
  useEffect(() => {
    async function fetchData() {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const response = await axios.get(`${BASE_URL}user`, {
          headers: {
            Authorization: token,
          },
        });

        if (response?.status === 200) {
          setUser(response?.data?.data);
          setLoading(false);
        } else if (response?.status === 500) {
          alert("server side error");
        }
      }
    }
    fetchData();
  }, []);


  console.log(user);

  return (
    <SafeAreaView
      className="flex h-full w-full"
      style={{ paddingTop: paddingTop }}
    >
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Text className="text-center p-4 text-2xl font-semibold">
            Profile
          </Text>

          <View className="flex justify-center items-center bg-[white] m-8 rounded-2xl p-4">
            <View className="flex items-center flex-row pt-4">
              <Image
                source={Icons.user}
                style={{ resizeMode: "contain" }}
                width={30}
                className="mr-4"
              />
              <Text>{user?.username}</Text>
            </View>

            <View className="my-8">
              <Text className="text-2xl">
                Total workouts: {user?.workouts.length}
              </Text>
            </View>
            <View className="mb-4">
              <Button title={"Logout"} onPress={handlePress} />
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Profile;
