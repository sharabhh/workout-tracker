import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import SearchBox from "@/components/SearchBox";
import Button from "@/components/Button";

const Workout = () => {
  return (
    <View style={style.container}>
      <Text className="text-3xl font-semibold my-4">Your Workouts</Text>
      <View style={style.searchContainer}>
        <View style={style.searchBoxContainer}>
          <SearchBox />
        </View>
        <View style={style.buttonContainer}>
          <Button />
        </View>
      </View>

      {/* main body */}
      <ScrollView className="w-4/5" showsVerticalScrollIndicator={false}>
        <View className="p-4 bg-gray-400 rounded-xl mt-4">
          <View className="w-full">
            <View className="flex flex-row justify-between items-center">
              <Text className="text-2xl text-white">Workout 1</Text>
              <Text className="text-sm text-white">12/11/24</Text>
            </View>
            <View className="flex flex-row justify-start mt-1">
              <Text className="text-sm text-white mr-4">⌚ 12:03</Text>
              <Text className="text-sm text-white">🔥 547</Text>
            </View>
          </View>
        </View>
        <View className="p-4 bg-gray-400 rounded-xl mt-4">
          <View className="w-full">
            <View className="flex flex-row justify-between items-center">
              <Text className="text-2xl text-white">Workout 1</Text>
              <Text className="text-sm text-white">12/11/24</Text>
            </View>
            <View className="flex flex-row justify-start mt-1">
              <Text className="text-sm text-white mr-4">⌚ 12:03</Text>
              <Text className="text-sm text-white">🔥 547</Text>
            </View>
          </View>
        </View>
        <View className="p-4 bg-gray-400 rounded-xl mt-4">
          <View className="w-full">
            <View className="flex flex-row justify-between items-center">
              <Text className="text-2xl text-white">Workout 1</Text>
              <Text className="text-sm text-white">12/11/24</Text>
            </View>
            <View className="flex flex-row justify-start mt-1">
              <Text className="text-sm text-white mr-4">⌚ 12:03</Text>
              <Text className="text-sm text-white">🔥 547</Text>
            </View>
          </View>
        </View>
        <View className="p-4 bg-gray-400 rounded-xl mt-4">
          <View className="w-full">
            <View className="flex flex-row justify-between items-center">
              <Text className="text-2xl text-white">Workout 1</Text>
              <Text className="text-sm text-white">12/11/24</Text>
            </View>
            <View className="flex flex-row justify-start mt-1">
              <Text className="text-sm text-white mr-4">⌚ 12:03</Text>
              <Text className="text-sm text-white">🔥 547</Text>
            </View>
          </View>
        </View>
        <View className="p-4 bg-gray-400 rounded-xl mt-4">
          <View className="w-full">
            <View className="flex flex-row justify-between items-center">
              <Text className="text-2xl text-white">Workout 1</Text>
              <Text className="text-sm text-white">12/11/24</Text>
            </View>
            <View className="flex flex-row justify-start mt-1">
              <Text className="text-sm text-white mr-4">⌚ 12:03</Text>
              <Text className="text-sm text-white">🔥 547</Text>
            </View>
          </View>
        </View>
        <View className="p-4 bg-gray-400 rounded-xl mt-4">
          <View className="w-full">
            <View className="flex flex-row justify-between items-center">
              <Text className="text-2xl text-white">Workout 1</Text>
              <Text className="text-sm text-white">12/11/24</Text>
            </View>
            <View className="flex flex-row justify-start mt-1">
              <Text className="text-sm text-white mr-4">⌚ 12:03</Text>
              <Text className="text-sm text-white">🔥 547</Text>
            </View>
          </View>
        </View>
        <View className="p-4 bg-gray-400 rounded-xl mt-4">
          <View className="w-full">
            <View className="flex flex-row justify-between items-center">
              <Text className="text-2xl text-white">Workout 1</Text>
              <Text className="text-sm text-white">12/11/24</Text>
            </View>
            <View className="flex flex-row justify-start mt-1">
              <Text className="text-sm text-white mr-4">⌚ 12:03</Text>
              <Text className="text-sm text-white">🔥 547</Text>
            </View>
          </View>
        </View>
        <View className="p-4 bg-gray-400 rounded-xl mt-4">
          <View className="w-full">
            <View className="flex flex-row justify-between items-center">
              <Text className="text-2xl text-white">Workout 1</Text>
              <Text className="text-sm text-white">12/11/24</Text>
            </View>
            <View className="flex flex-row justify-start mt-1">
              <Text className="text-sm text-white mr-4">⌚ 12:03</Text>
              <Text className="text-sm text-white">🔥 547</Text>
            </View>
          </View>
        </View>
        <View className="p-4 bg-gray-400 rounded-xl mt-4">
          <View className="w-full">
            <View className="flex flex-row justify-between items-center">
              <Text className="text-2xl text-white">Workout 1</Text>
              <Text className="text-sm text-white">12/11/24</Text>
            </View>
            <View className="flex flex-row justify-start mt-1">
              <Text className="text-sm text-white mr-4">⌚ 12:03</Text>
              <Text className="text-sm text-white">🔥 547</Text>
            </View>
          </View>
        </View>
        <View className="p-4 bg-gray-400 rounded-xl mt-4">
          <View className="w-full">
            <View className="flex flex-row justify-between items-center">
              <Text className="text-2xl text-white">Workout 1</Text>
              <Text className="text-sm text-white">12/11/24</Text>
            </View>
            <View className="flex flex-row justify-start mt-1">
              <Text className="text-sm text-white mr-4">⌚ 12:03</Text>
              <Text className="text-sm text-white">🔥 547</Text>
            </View>
          </View>
        </View>
        <View className="p-4 bg-gray-400 rounded-xl mt-4">
          <View className="w-full">
            <View className="flex flex-row justify-between items-center">
              <Text className="text-2xl text-white">Workout 1</Text>
              <Text className="text-sm text-white">12/11/24</Text>
            </View>
            <View className="flex flex-row justify-start mt-1">
              <Text className="text-sm text-white mr-4">⌚ 12:03</Text>
              <Text className="text-sm text-white">🔥 547</Text>
            </View>
          </View>
        </View>
        <View className="p-4 bg-gray-400 rounded-xl mt-4">
          <View className="w-full">
            <View className="flex flex-row justify-between items-center">
              <Text className="text-2xl text-white">Workout 1</Text>
              <Text className="text-sm text-white">12/11/24</Text>
            </View>
            <View className="flex flex-row justify-start mt-1">
              <Text className="text-sm text-white mr-4">⌚ 12:03</Text>
              <Text className="text-sm text-white">🔥 547</Text>
            </View>
          </View>
        </View>
        <View className="p-4 bg-gray-400 rounded-xl mt-4">
          <View className="w-full">
            <View className="flex flex-row justify-between items-center">
              <Text className="text-2xl text-white">Workout 1</Text>
              <Text className="text-sm text-white">12/11/24</Text>
            </View>
            <View className="flex flex-row justify-start mt-1">
              <Text className="text-sm text-white mr-4">⌚ 12:03</Text>
              <Text className="text-sm text-white">🔥 547</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 36,
    // justifyContent: 'center',
    alignItems: "center",
    width: "100%",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
    width: "100%",
    // backgroundColor: "white",
    // textAlign: "center",
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
