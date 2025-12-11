import { ThemeContext } from "@/context/ThemeContext.js";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Octicons from "@expo/vector-icons/Octicons";
import React, { useContext, useState } from "react";
import { FlatList, Pressable, StatusBar, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import data from "../data/todo.js";
import createIndexStyles from "./style.js";

export default function Index() {
  const [text, setText] = React.useState("Add a new todo");
  const [todos, setTodos] = useState(data.sort((a, b) => b.id - a.id));
  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);

  const indexStyles = createIndexStyles(theme);
  const separationCont = <View style={indexStyles.separator} />;
  const [loaded, error] = useFonts({
    Inter_500Medium,
  });

  if (!loaded && !error) return null;

  const addTodo = () => {
    if (text.trim()) {
      const newId = todos.length > 0 ? todos[0].id + 1 : 1;
      setTodos([
        {
          id: newId,
          title: text,
          completed: false,
        },
        ...todos,
      ]);
      setText("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo
      )
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={indexStyles.background}>
        <View style={indexStyles.header}>
          <TextInput style={indexStyles.input} onChangeText={setText} value={text} placeholderTextColor={theme.text} maxLength={30} />
          <Pressable onPress={() => addTodo()} style={indexStyles.button}>
            <Text style={indexStyles.text}>Add</Text>
          </Pressable>
          <Pressable onPress={() => setColorScheme(colorScheme === "light" ? "dark" : "light")} style={{ marginRight: 10 }}>
            {colorScheme === "dark" ? <Octicons name="moon" size={36} color={theme.text} selectable={undefined} style={{ width: 36 }} /> : <Octicons name="sun" size={36} color={theme.text} selectable={undefined} style={{ width: 36 }} />}
          </Pressable>
        </View>
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={indexStyles.taskText}>No items</Text>}
          contentContainerStyle={indexStyles.contentContainer}
          ItemSeparatorComponent={separationCont}
          renderItem={({ item }) => (
            <View style={indexStyles.todoRow}>
              <Text style={[indexStyles.taskText, item.completed && indexStyles.completedText]} onPress={() => toggleTodo(item.id)}>
                {item.title}
              </Text>
              <Pressable style={indexStyles.iconBack} onPress={() => removeTodo(item.id)}>
                <FontAwesome name="trash-o" size={24} color={theme.text} />
              </Pressable>
            </View>
          )}
        />
      </View>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </SafeAreaView>
  );
}
