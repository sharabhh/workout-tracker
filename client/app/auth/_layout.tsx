import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

const _layout = () => {
  return (
    <>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="login"
        />
        <Stack.Screen
          name="signup"
        />
      </Stack>
      <StatusBar backgroundColor="black" />
    </>
  );
};

export default _layout;
