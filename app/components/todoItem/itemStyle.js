import { Platform, StyleSheet } from "react-native";
const value = Platform.OS === "web" ? 1.4 : 1;

function todoItemStyle(theme) {
    return StyleSheet.create({
        taskText: {
            fontSize: 20 * value,
            color: theme.text,
        },
        todoRow: {

            margin: 6,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "center"
        },
        completedText: {
            textDecorationLine: "line-through",
            color: theme.textCross
        },
        iconBack: {
            marginLeft: 20,
            backgroundColor: "rgba(222, 71, 71, 1)",
            height: 40,
            width: 40,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center"
        },
    })
}

export default todoItemStyle