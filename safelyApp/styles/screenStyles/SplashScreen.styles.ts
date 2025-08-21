import { Dimensions, StyleSheet } from "react-native";


const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff", 
  },
  text: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 42,
    color: "#00A0A0",
  },
});