import { Tabs } from "expo-router";
import { View, Text, Image } from "react-native";
import TabBarBackground from "@/components/ui/TabBarBackground";
import Icons from "@/constants/Icons";

export default function TabLayout() {
  const TabIcon = ({ icon, color, name, focused }: any) => (
    <View
      className="flex items-center justify-center pt-6 gap-2"
      style={{ width: 75, overflow: "visible" }}
    >
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-7 h-7"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
        numberOfLines={1}
      >
        {name}
      </Text>
    </View>
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFA001",
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
              icon={Icons.weight}
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
