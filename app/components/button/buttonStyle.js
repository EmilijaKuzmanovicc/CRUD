import { Platform, StyleSheet } from "react-native"

function buttonStyles(theme) {
    return StyleSheet.create({
        button: {
            margin: 8,
            padding: 16,
            fontSize: (Platform.OS === "web" ? 1.4 : 1) * 16,
            backgroundColor: theme.button,
            color: theme.text,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 6
        },
        text: {
            fontSize: (Platform.OS === "web" ? 1.4 : 1) * 16,
            color: theme.text,
        },
        buttonIcon: {
            marginLeft: 4,
        },
    })
}

export default buttonStyles