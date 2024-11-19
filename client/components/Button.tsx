import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";

const Button = () => {
    function handlePress(){
        alert('pressed')
    }
  return (
    <View style={style.wrapper}>
      <Pressable onPress={handlePress} style={style.container}>
        <Text style={style.text}>Button</Text>
      </Pressable>
    </View>
  );
};

export default Button;

const style = StyleSheet.create({
    wrapper:{
        // flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    container:{
        backgroundColor: 'teal',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        // width: 60,
        // flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    }
})