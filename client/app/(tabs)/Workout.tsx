import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import SearchBox from "@/components/SearchBox";
import Button from "@/components/Button";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { workoutType } from "../types/typescriptTypes";
import formatDate from "@/utils/dateFormater";
import { useRouter } from "expo-router";

const Workout = () => {
  const [workouts, setWorkouts] = useState<workoutType[][]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [latestOrder, setLatestOrder] = useState(true);
  const router = useRouter();
  const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;


  async function fetchWorkouts() {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${baseUrl}workout`, {
      headers: {
        Authorization: token,
      },
    });
    if (response.status === 200) {
      setWorkouts(response.data);
      setLoading(false);
    } else if (response.status === 404) {
      router.push("/auth/Login");
      alert("user doesn't exists/invalid session");
    } else {
      alert("an error occured. Please check later.");
    }
  }
  useEffect(() => {
    fetchWorkouts();
  }, []);

  async function handleSearch() {
    if (!searchTerm) {
      return alert("Enter workout name");
    }

    const response = await axios.get(`${baseUrl}workout/search/${searchTerm}`, {
      headers: {
        Authorization: await AsyncStorage.getItem("token"),
      },
    });

    if (response.status === 200) {
      setWorkouts([response.data]);
    }
  }


  function handleSortDate() {
    const sortedWorkouts = [...workouts[0]].reverse(); // Reverse the workouts to simulate sorting by date
    setWorkouts([sortedWorkouts]);
    setLatestOrder(!latestOrder);
  }

  function handleReset() {
    fetchWorkouts();
    setSearchTerm("");
  }

async function handleDelete(id: string){
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.delete(`${baseUrl}workout/${id}`, {
      headers: {
        Authorization: token,
      },
    });

    if (response.status === 200) {
      alert("Workout deleted successfully!");
      
      fetchWorkouts()
     
    } else {
      alert("Failed to delete workout. Please try again.");
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred while deleting the workout.");
  }
  
}

  return (
    <View style={style.container}>
      <Text className="text-3xl font-semibold my-4">Your Workouts</Text>
      <View style={style.searchContainer}>
        <View style={style.searchBoxContainer}>
          <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </View>
        <View style={style.buttonContainer}>
          <Button title="🔍" onPress={handleSearch} />
        </View>
      </View>
      <View className="mt-2 flex-row justify-evenly w-full">
        {latestOrder ? (
          <Button
            title="Oldest first"
            color="#5a5b5c"
            onPress={handleSortDate}
          />
        ) : (
          <Button
            title="Latest first"
            color="#9ca19e"
            onPress={handleSortDate}
          />
        )}
        <Button title="Reset" onPress={handleReset} />
      </View>
 

      {/* main body */}
      {loading ? (
        <View>
          <Text>loading...</Text>
        </View>
      ) : (
        <ScrollView className="w-4/5" showsVerticalScrollIndicator={false}>
          {workouts[0].map((workout, idx) => (
            <View className="p-4 bg-gray-400 rounded-xl mt-4" key={idx}>
              <View className="w-full">
                <View className="flex flex-row justify-between items-center">
                  <Text className="text-2xl text-white">{workout?.name}</Text>
                  <Text className="text-sm text-white">
                    {formatDate(workout?.date || "")}
                  </Text>
                </View>
                <View className="flex-row justify-between mt-1 items-center">
                  <View className="flex flex-row justify-start">
                    <Text className="text-sm text-white mr-4">⌚ 12:03</Text>
                    <Text className="text-sm text-white">🔥 547</Text>
                  </View>
                  <Pressable onPress={() => handleDelete(workout._id || "")}>
                    <View className="py-2 px-4 bg-red-600 rounded-xl">
                      <Text>🗑️</Text>
                    </View>
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 36,
    alignItems: "center",
    width: "100%",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
    width: "100%",
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  searchBoxContainer: {
    flex: 1,
    marginRight: 8,
  },
  buttonContainer: {
    flexShrink: 0,
  },
});
export default Workout;
