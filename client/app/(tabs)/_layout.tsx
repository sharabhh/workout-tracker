import { Tabs } from "expo-router";
import React from "react";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { useColorScheme } from "@/hooks/useColorScheme";
import Icons from "@/constants/Icons";
import { View, Text, Image } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const TabIcon = ({ icon, color, name, focused }: any) => {
    return (
      <View className="flex items-center justify-center gap-2">
        <Image
          source={icon}
          resizeMode="contain"
          tintColor={color}
          className="w-7 h-7"
        />
        <Text
          className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
          style={{ color: color }}
        >
          {name}
        </Text>
      </View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFA001",
        // toBarInactiveTintColor: "#CDCDE0",
        headerShown: false,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopWidth: 1,
          borderTopColor: "#232533",
          height: 65,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarLabel: "",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={Icons.home}
              color={color}
              name="Home"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Workout"
        options={{
          title: "Workout",
          tabBarLabel: "",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={Icons.user}
              color={color}
              name="Workout"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarLabel: "",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={Icons.user}
              color={color}
              name="Profile"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
