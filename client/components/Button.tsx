import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import React from "react";

type ButtonProps = {
  title: string;
  disabled?: boolean;
  color?: string;
  onPress: () => void;
};

const Button: React.FC<ButtonProps> = ({ title, disabled=false,color="teal", onPress }) => {
  return (
    <TouchableOpacity>
      <View style={style.wrapper}>
        <Pressable onPress={onPress} style={[style.container, {backgroundColor: color}]} disabled={disabled}>
          <Text style={style.text}>{title}</Text>
        </Pressable>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const style = StyleSheet.create({
  wrapper: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "teal",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    // width: 60,
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
