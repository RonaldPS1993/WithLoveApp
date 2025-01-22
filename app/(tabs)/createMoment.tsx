import { Text, View, Dimensions, StyleSheet, Image, TouchableOpacity } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useFonts } from 'expo-font';
const { width, height } = Dimensions.get("window");

export default function CreateMoment() {
  return (
    <View style={{width: width, height: "100%", backgroundColor: "#FFFFF7"}}>
      <Text>Create Moment</Text>
    </View>
  );
}