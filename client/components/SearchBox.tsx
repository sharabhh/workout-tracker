import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { TouchableHighlight } from "react-native";

const SearchBox = () => {
  return (
    <View>
      <TouchableHighlight style={style.container}>
        <TextInput style={style.searchBox} placeholder="search workouts"></TextInput>
      </TouchableHighlight>
    </View>
  );
};

export default SearchBox;

const style = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 25,
  },
  searchBox: {
    // width: 100,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#f5f5f5'
  },
});
