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
} from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icons from "@/constants/Icons";

const Home = () => {
  const paddingTop =
    Platform.OS === "android" && StatusBar.currentHeight
      ? Math.ceil(StatusBar.currentHeight)
      : 0;

  function handlePress() {
    alert("pressed");
  }

  return (
    <SafeAreaView
      style={{ paddingTop }}
      className={`h-full flex items-center w-full`}
    >
      <ScrollView className="mt-12">
        <View className="flex w-full pl-8">
          <Text className="text-3xl font-semibold">Hello, Sharabh 🙋‍♂️</Text>
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
      </ScrollView>
      <Pressable
        className="absolute right-[8px] bottom-[8px] bg-teal-600 p-2 rounded-xl"
        onPress={handlePress}
      >
        <Text>
          <Image source={Icons.plus} className="w-10 h-10" />
        </Text>
      </Pressable>
      <StatusBar backgroundColor="black" />
    </SafeAreaView>
  );
};

export default Home;
