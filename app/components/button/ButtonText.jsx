import { Pressable, Text } from "react-native";
import buttonStyles from "./buttonStyle.js";

export default function ButtonText({ onClick, theme, text, style }) {
  const indexStyles = buttonStyles(theme);
  return (
    <Pressable onPress={onClick} style={[indexStyles.button, style]}>
      <Text style={indexStyles.text}>{text}</Text>
    </Pressable>
  );
}
