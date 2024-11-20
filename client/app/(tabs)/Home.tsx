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
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icons from "@/constants/Icons";
import Button from "@/components/Button";
import ExerciseData from "@/components/ExerciseData";
import workoutDataSchema from "../types/zod";
import axios from "axios";
import { BASE_URL } from "@env";

const Home = () => {
  const [createWorkoutFlag, setCreateWorkoutFlag] = useState(false);
  const paddingTop =
    Platform.OS === "android" && StatusBar.currentHeight
      ? Math.ceil(StatusBar.currentHeight)
      : 0;

  function handlePress() {
    setCreateWorkoutFlag(true);
  }

  return (
    <SafeAreaView
      style={{ paddingTop }}
      className={`h-full flex items-center w-full`}
    >
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
                  Hello, Sharabh 🙋‍♂️
                </Text>
                <Text className="text-xl ">Sculpt your perfect body</Text>
              </View>

              <View className="items-center mt-4">
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
                <Text className="text-2xl">Today's workout(s)</Text>
                <View className="p-4 bg-gray-400 rounded-xl mt-4">
                  <View className="flex flex-row justify-between items-center">
                    <Text className="text-2xl text-white">Workout 1</Text>
                    <Text className="text-sm text-white">12:03</Text>
                  </View>
                </View>
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
