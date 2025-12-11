import { ThemeContext } from "@/context/ThemeContext";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import Octicons from "@expo/vector-icons/Octicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Pressable, StatusBar, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import createIndexStyles from "../style";

export default function EditScreen() {
  const { id } = useLocalSearchParams();
  const [todo, setTodo] = useState({});
  const router = useRouter();
  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);
  const [loaded, error] = useFonts({ Inter_500Medium });
  const indexStyles = createIndexStyles(theme);

  const fetchData = async (id) => {
    try {
      const jsonValue = await AsyncStorage.getItem("TodoApp");
      const storageTodos = jsonValue != null ? JSON.parse(jsonValue) : null;
      if (storageTodos && storageTodos.length) {
        const myTodo = storageTodos.find((todo) => todo.id.toString() === id);
        setTodo(myTodo);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData(id);
  }, [id]);
  if (!loaded && !error) return null;

  const handleSave = async () => {
    try {
      const savedTodo = { ...todo, title: todo.title };
      const jsonValue = await AsyncStorage.getItem("TodoApp");
      const storageTodos = jsonValue != null ? JSON.parse(jsonValue) : null;

      if (storageTodos && storageTodos.length) {
        const otherTodo = storageTodos.filter((todo) => todo.id !== savedTodo.id);
        const allTodo = [...otherTodo, savedTodo];
        await AsyncStorage.setItem("TodoApp", JSON.stringify(allTodo));
      } else {
        await AsyncStorage.setItem("TodoApp", JSON.stringify([savedTodo]));
      }

      router.push("/");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <SafeAreaView style={indexStyles.background}>
      <View style={indexStyles.header}>
        <TextInput style={indexStyles.input} placeholder="Edit todo" maxLength={30} placeholderTextColor={theme.text} value={todo?.title || ""} onChangeText={(text) => setTodo((prev) => ({ ...prev, title: text }))} />
        <Pressable onPress={() => setColorScheme(colorScheme === "light" ? "dark" : "light")} style={{ marginRight: 10, marginLeft: 10 }}>
          {colorScheme === "dark" ? <Octicons name="moon" size={36} color={theme.text} selectable={undefined} style={{ width: 36 }} /> : <Octicons name="sun" size={36} color={theme.text} selectable={undefined} style={{ width: 36 }} />}
        </Pressable>
      </View>
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <Pressable onPress={handleSave} style={[indexStyles.buttonText]}>
          <Text style={[indexStyles.text]}>Save</Text>
        </Pressable>
        <Pressable onPress={() => router.push("/")} style={[indexStyles.buttonText, { backgroundColor: "red" }]}>
          <Text style={indexStyles.text}>Cancel</Text>
        </Pressable>
      </View>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </SafeAreaView>
  );
}
