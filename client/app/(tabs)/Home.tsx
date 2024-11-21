import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Pressable,
  Image,
  StatusBar,
  Platform,
  FlatList,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icons from "@/constants/Icons";
import Button from "@/components/Button";
import ExerciseData from "@/components/ExerciseData";
import workoutDataSchema from "../types/zod";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "@env";
import { useRouter } from "expo-router";
import { userType } from "../types/typescriptTypes";
import formatDate from "@/utils/dateFormater";

const baseUrl = BASE_URL;
const Home = () => {
  const [createWorkoutFlag, setCreateWorkoutFlag] = useState(false);
  const [user, setUser] = useState<userType | null>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const paddingTop =
    Platform.OS === "android" && StatusBar.currentHeight
      ? Math.ceil(StatusBar.currentHeight)
      : 0;

  function handlePress() {
    setCreateWorkoutFlag(true);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const response = await axios.get(`${baseUrl}user`, {
            headers: {
              Authorization: token,
            },
          });

          if (response?.status === 200) {
            setUser(response?.data?.data);
            setLoading(false);
          }
        }
      } catch (e) {
        const response = e as AxiosError;
        if (response?.status === 404) {
          await AsyncStorage.removeItem("token");
          router.push("/auth/Login");
          alert("user not found");
        } else {
          alert("server side error");
        }
        console.log(e);
      }
    }
    fetchData();
  }, []);

  // since in the backend we are pushing to the array, so last element will be the latest
  const lastWorkout = user?.workouts[user?.workouts?.length - 1];

  return (
    <SafeAreaView
      style={{ paddingTop }}
      className={`h-full flex items-center w-full`}
    >
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          {createWorkoutFlag ? (
            <ScrollView className="py-4 px-2 w-full">
              <CreateWorkout setCreateWorkoutFlag={setCreateWorkoutFlag} />
            </ScrollView>
          ) : (
            <>
              <ScrollView className="mt-12">
                <View>
                  <View className="flex w-full pl-8">
                    <Text className="text-3xl font-semibold">
                      Hello, {user?.username} 🙋‍♂️
                    </Text>
                    <Text className="text-xl">Sculpt your perfect body</Text>
                  </View>

                  <View className="items-center my-8">
                    <Text className="text-xl">Workouts coming soon!</Text>
                    <FlatList
                      className="flex flex-row mt-4 ml-4"
                      data={[
                        { key: "Back" },
                        { key: "Chest" },
                        { key: "Legs" },
                        { key: "abs" },
                        { key: "cardio" },
                      ]}
                      renderItem={({ item }) => (
                        <View className="bg-gray-400 flex p-8 mx-2 rounded-xl">
                          <Text className="text-white">{item.key}</Text>
                        </View>
                      )}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    />
                  </View>

                  <View className="mx-4 mt-4">
                    {/* <Text className="text-3xl">No workouts today</Text> */}
                    <Text className="text-2xl">Last workout</Text>

                    {lastWorkout ? (
                      <View className="p-4 bg-gray-400 rounded-xl mt-4">
                        <View className="w-full">
                          <View className="flex flex-row justify-between items-center">
                            <Text className="text-2xl text-white">
                              {lastWorkout?.name}
                            </Text>
                            <Text className="text-sm text-white">
                              {formatDate(lastWorkout?.date || "")}
                            </Text>
                          </View>
                          <View className="flex flex-row justify-start mt-1">
                            <Text className="text-sm text-white mr-4">
                              ⌚ 12:03
                            </Text>
                            <Text className="text-sm text-white">🔥 547</Text>
                          </View>
                        </View>
                      </View>
                    ) : (
                      <Text className="text-center mt-2 font-bold">No last workout found</Text>
                    )}
                  </View>
                </View>
              </ScrollView>
              <Pressable
                className="absolute right-[8px] bottom-[8px] bg-teal-600 p-2 rounded-xl"
                onPress={handlePress}
              >
                <Text>
                  <Image source={Icons.plus} className="w-10 h-10" />
                </Text>
              </Pressable>
            </>
          )}
        </>
      )}
      <StatusBar backgroundColor="black" />
    </SafeAreaView>
  );
};

export default Home;

type CreateWorkoutProps = {
  setCreateWorkoutFlag: React.Dispatch<React.SetStateAction<boolean>>;
};

function CreateWorkout({ setCreateWorkoutFlag }: CreateWorkoutProps) {
  const [workoutData, setWorkoutData] = useState({
    name: "workout name",
    exercises: [
      {
        name: "",
        video: "",
        sets: null,
        reps: null,
        weight: 0,
      },
    ],
  });

  const handleNameChange = (text: string) => {
    setWorkoutData((prev) => ({
      ...prev,
      name: text,
    }));
  };

  console.log(workoutData.name);

  async function handleFinish() {
    const verifyFormat = workoutDataSchema.safeParse(workoutData);
    console.log(verifyFormat);

    const token = await AsyncStorage.getItem("token");
    if (verifyFormat.success && token) {
      const response = await axios.post(`${BASE_URL}workout/add`, workoutData, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response);
    }
  }

  function handleCancel() {
    setCreateWorkoutFlag(false);
  }

  const updateExercise = (index: number, field: string, value: any) => {
    setWorkoutData((prev) => {
      const updatedExercises = [...prev.exercises];
      updatedExercises[index] = {
        ...updatedExercises[index],
        [field]: value,
      };
      return {
        ...prev,
        exercises: updatedExercises,
      };
    });
  };

  console.log(workoutData);

  function handleAddExercise() {
    setWorkoutData((prev) => ({
      ...prev,
      exercises: [
        ...prev.exercises,
        {
          name: "",
          video: "",
          sets: null,
          reps: null,
          weight: 0,
        },
      ],
    }));
  }

  const handleRemoveExercise = () => {
    setWorkoutData((prev) => {
      if (prev.exercises.length > 1) {
        return {
          ...prev,
          exercises: prev.exercises.slice(0, -1),
        };
      }
      return prev; // Prevent removing the last exercise
    });
  };

  return (
    <View className="">
      <View className="flex-row justify-between items-center">
        <Button title={"Cancel"} color="#636362" onPress={handleCancel} />
        <Text className="text-xl font-semibold">Create a workout</Text>
        <Button title={"Finish"} onPress={handleFinish} />
      </View>
      <View className="flex items-center my-4">
        <View className="w-4/5">
          <TextInput
            className="border-b-[1px] px-8 rounded-3xl text-center"
            placeholder="workout name"
            value={workoutData.name}
            onChangeText={handleNameChange}
          />
        </View>

        {workoutData.exercises.map((exercise, index) => (
          <View key={index} className="w-4/5 mt-8">
            <ExerciseData
              exercise={exercise}
              index={index}
              updateExercise={updateExercise}
            />
          </View>
        ))}
        <View className="flex-row">
          <View className="mr-4">
            <Button
              title="Add Exercise"
              onPress={handleAddExercise}
              disabled={false}
            />
          </View>
          <View>
            <Button
              title="🗑️"
              color="#e33b29"
              onPress={handleRemoveExercise}
              disabled={workoutData.exercises.length <= 1 ? true : false}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
