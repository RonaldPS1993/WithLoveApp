import { Text, View, Dimensions, StyleSheet, Image, TouchableOpacity } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useFonts } from 'expo-font';
const { width, height } = Dimensions.get("window");

export default function Home() {
  const [fontsLoaded] = useFonts({
    PoppinsSemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.fullScreen}>
      <TouchableOpacity onPress={() => console.log("create")}>
        <Image source={require("../../assets/images/createIcon.png")} 
        style={{ width: (width + height) * 0.12, height: (width + height) * 0.12, marginTop: hp("20%") }} />
      </TouchableOpacity>
      <Text style={{ fontFamily: "PoppinsRegular", fontSize: (width + height) * 0.013, marginTop: hp("5%"), width: wp("50%"), textAlign: "center" }}>
        Share moments that matter, with love!
      </Text>
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
