import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { Pressable, Text, View } from "react-native";
import todoItemStyle from "./itemStyle.js";

export default function TodoItem({ item, onLongPress, onPress, onRemove, theme }) {
  const itemStyle = todoItemStyle(theme);
  return (
    <View style={itemStyle.todoRow}>
      <Pressable onLongPress={onLongPress} onPress={onPress} accessible={true} accessibilityRole="button">
        <Text style={[itemStyle.taskText, item.completed && itemStyle.completedText]}>{item.title}</Text>
      </Pressable>

      <Pressable style={itemStyle.iconBack} onPress={onRemove} accessible={true} accessibilityRole="button" accessibilityLabel={`Delete ${item.title}`}>
        <FontAwesome name="trash-o" size={24} color={theme.text} />
      </Pressable>
    </View>
  );
}
