import { Platform, StyleSheet } from "react-native"
const value = Platform.OS === "web" ? 1.4 : 1;

function createIndexStyles(theme) {
    return StyleSheet.create({
        input: {
            fontFamily: 'Inter_500Medium',
            width: "77%",
            height: 40 * value,
            margin: 4,
            borderWidth: 1,
            padding: 10,
            fontSize: value * 16,
            color: theme.text,
            borderRadius: 6,
            borderColor: theme.text,
        },
        button: {
            margin: 4,
            width: 50 * value,
            height: 40 * value,
            fontSize: value * 16,
            backgroundColor: theme.button,
            color: theme.text,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 6
        },
        text: {
            fontSize: value * 16,
            color: theme.text,
        },
        header: {
            marginTop: 16,
            width: "90%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center"
        },
        background: {
            flex: 1,
            width: "100%",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingTop: Platform.OS === "web" ? 20 : 0,
            backgroundColor: theme.background
        },
        separator: {
            height: 1,
            backgroundColor: theme.text,
            width: "95%",
            alignSelf: "center",
            marginBottom: 10,
            marginTop: 10
        },
        todoRow: {
            width: "95%",
            margin: 6,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "center"
        },
        contentContainer: {
            fontFamily: 'Inter_500Medium',
            marginTop: 10,
            marginBottom: 10,
            width: "95%",
        },
        taskText: {
            fontSize: 20 * value,
            color: theme.text,
        },
        icons: {
            fontSize: 20,
            backgroundColor: theme.white
        },
        iconBack: {
            backgroundColor: "rgba(222, 71, 71, 1)",
            height: 40,
            width: 40,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center"
        },
        completedText: {
            textDecorationLine: "line-through",
            color: theme.textCross
        }
    })
}
export default createIndexStyles