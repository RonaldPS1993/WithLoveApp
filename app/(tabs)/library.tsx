import { Text, View, Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export default function Library() {
  return (
    <View style={styles.fullScreen}>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    backgroundColor: '#FFFFF7', 
    width: width,
    height: "100%",
    alignItems: "center",
  },
});
