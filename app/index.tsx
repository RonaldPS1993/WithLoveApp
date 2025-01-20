import { Text, View, Dimensions, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function Home() {
  const insets = useSafeAreaInsets();
  return (
      
    <View
        style={styles.fullScreen}
      >
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    ...StyleSheet.absoluteFillObject, // Covers the entire screen
    backgroundColor: '#FFFFF7', 
  },
});
