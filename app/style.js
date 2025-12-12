import { Platform, StyleSheet } from "react-native";
const value = Platform.OS === "web" ? 1.4 : 1;

function createIndexStyles(theme) {
    return StyleSheet.create({
        input: {
            fontFamily: 'Inter_500Medium',
            flex: 1,
            height: 40 * value,
            margin: 4,
            borderWidth: 1,
            padding: 10,
            fontSize: value * 16,
            color: theme.text,
            borderRadius: 6,
            borderColor: theme.text,
        },
        text: {
            fontSize: value * 16,
            color: theme.text,
        },
        header: {
            marginTop: 16,
            width: "90%",
            flexDirection: "row",
            justifyContent: "space-between",
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
            width: "100%",
            alignSelf: "center",
            marginBottom: 10,
            marginTop: 10
        },
        inRow: {

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
            justifyContent: "center",
            flexDirection: "column",
            paddingBottom: 10
        },
        body: {
            flex: 1,
            fontFamily: 'Inter_500Medium',
            margin: 10,
            width: "90%",
            flexDirection: "column",
            textAlign: "center",
            justifyContent: "center",
        },
        icons: {
            fontSize: 20,
            backgroundColor: theme.white
        },
        buttonText: {
            margin: 12,
            width: 100 * value,
            height: 40 * value,
            fontSize: value * 20,
            backgroundColor: theme.button,
            color: theme.text,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 6
        }
    })
}
export default createIndexStyles