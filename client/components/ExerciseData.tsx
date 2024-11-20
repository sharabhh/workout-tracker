import { View, Text, TextInput } from "react-native";
import React from "react";

type ExerciseDataProps = {
  exercise: {
    name: string;
    video: string | "";
    sets: number | null;
    reps: number | null;
    weight: number | null;
  };
  index: number;
  updateExercise: (index: number, field: string, value: any) => void;
};

const ExerciseData = ({
  exercise,
  index,
  updateExercise,
}: ExerciseDataProps) => {
  return (
    <View className="flex items-center">
      <TextInput
        className="border rounded-3xl p-4 w-full"
        placeholder="exercise name"
        value={exercise.name}
        style={{ borderColor: "#939599" }}
        onChangeText={(text) => updateExercise(index, "name", text)}
      />
      <View className="flex-row justify-evenly items-center my-4">
        <TextInput
          className="border px-4"
          placeholder="sets"
          style={{ borderColor: "#939599" }}
          value={exercise.sets?.toString() || ""}
          onChangeText={(text) => updateExercise(index, "sets", Number(text))}
          keyboardType="numeric"
        />
        <Text className="mx-2">X</Text>
        <TextInput
          className="border px-4"
          placeholder="reps"
          style={{ borderColor: "#939599" }}
          value={exercise.reps?.toString() || ""}
          onChangeText={(text) => updateExercise(index, "reps", Number(text))}
          keyboardType="numeric"
        />
        <Text className="mx-2">X</Text>
        <TextInput
          className="border px-4"
          placeholder="weight (kg)"
          style={{ borderColor: "#939599" }}
          value={exercise.weight?.toString() || ""}
          onChangeText={(text) => updateExercise(index, "weight", Number(text))}
          keyboardType="numeric"
        />
      </View>
    </View>
  );
};

export default ExerciseData;
