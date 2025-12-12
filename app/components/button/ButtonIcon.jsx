import Octicons from "@expo/vector-icons/Octicons";
import { Pressable } from "react-native";
import buttonStyles from "./buttonStyle.js";

export default function ButtonIcon({ onClick, theme, firstIcon, secondIcon, style, size, colorScheme }) {
  const indexStyles = buttonStyles(theme);
  return (
    <Pressable onPress={onClick}>
      {colorScheme === "dark" ? <Octicons name={firstIcon} size={size} color={theme.text} selectable={undefined} style={indexStyles.buttonIcon} /> : <Octicons name={secondIcon} size={size} color={theme.text} selectable={undefined} style={indexStyles.buttonIcon} />}
    </Pressable>
  );
}
