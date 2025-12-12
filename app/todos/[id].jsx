import { ThemeContext } from "@/context/ThemeContext";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { StatusBar, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonIcon from "../components/button/ButtonIcon";
import ButtonText from "../components/button/ButtonText";
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
    <SafeAreaView style={indexStyles.background} importantForAccessibility="auto">
      <View style={indexStyles.header}>
        <TextInput style={indexStyles.input} placeholder="Edit todo" maxLength={30} placeholderTextColor={theme.text} value={todo?.title || ""} onChangeText={(text) => setTodo((prev) => ({ ...prev, title: text }))} />
        <ButtonIcon onClick={() => setColorScheme(colorScheme === "light" ? "dark" : "light")} colorScheme={colorScheme} theme={theme} firstIcon="moon" secondIcon="sun" size={36} />
      </View>
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <ButtonText onClick={handleSave} theme={theme} text="Save" style={{ width: 120 }} />
        <ButtonText onClick={() => router.push("/")} theme={theme} text="Cancel" style={{ backgroundColor: "red", width: 120 }} />
      </View>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </SafeAreaView>
  );
}
