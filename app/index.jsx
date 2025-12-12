import { ThemeContext } from "@/context/ThemeContext.js";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { StatusBar, Text, TextInput, View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import data from "../data/todo.js";
import ButtonIcon from "./components/button/ButtonIcon.jsx";
import ButtonText from "./components/button/ButtonText.jsx";
import TodoItem from "./components/todoItem/TodoItem.jsx";
import createIndexStyles from "./style.js";

export default function Index() {
  const [text, setText] = React.useState("Add a new todo");
  const [todos, setTodos] = useState([]);
  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);
  const indexStyles = createIndexStyles(theme);
  const separationCont = <View style={indexStyles.separator} />;
  const [loaded, error] = useFonts({
    Inter_500Medium,
  });

  const router = useRouter();
  const fetchData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("TodoApp");
      const storageTodos = jsonValue != null ? JSON.parse(jsonValue) : null;

      if (storageTodos && storageTodos.length) setTodos(storageTodos.sort((a, b) => b.id - a.id));
      else setTodos(data.sort((a, b) => b.id - a.id));
    } catch (e) {
      console.error(e);
    }
  };

  const storeTosos = async () => {
    try {
      const jsonValue = JSON.stringify(todos);
      await AsyncStorage.setItem("TodoApp", jsonValue);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [data]);

  useEffect(() => {
    storeTosos();
  }, [todos]);

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

  const handlePress = (id) => {
    router.push(`/todos/${id}`);
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  return (
    <SafeAreaView style={indexStyles.background} importantForAccessibility="auto">
      <View style={indexStyles.background}>
        <View style={indexStyles.header}>
          <TextInput style={indexStyles.input} onChangeText={setText} value={text} placeholderTextColor={theme.text} maxLength={30} />
          <View style={indexStyles.inRow}>
            <ButtonText onClick={() => addTodo()} theme={theme} text="Add" />
            <ButtonIcon onClick={() => setColorScheme(colorScheme === "light" ? "dark" : "light")} colorScheme={colorScheme} theme={theme} firstIcon="moon" secondIcon="sun" size={36} />
          </View>
        </View>
        <View style={indexStyles.body}>
          <Animated.FlatList
            data={todos}
            keyExtractor={(item, index) => (item.id != null ? item.id.toString() : index.toString())}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<Text style={indexStyles.taskText}>No items</Text>}
            contentContainerStyle={indexStyles.contentContainer}
            ItemSeparatorComponent={separationCont}
            itemLayoutAnimation={LinearTransition}
            keyboardDismissMode="on-drag"
            renderItem={({ item }) => <TodoItem item={item} onLongPress={() => toggleTodo(item.id)} onPress={() => handlePress(item.id)} onRemove={() => removeTodo(item.id)} theme={theme} />}
          />
        </View>
      </View>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </SafeAreaView>
  );
}
