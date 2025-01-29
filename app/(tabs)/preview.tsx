import { Text, View, Dimensions, StyleSheet, Image, TouchableOpacity, TextInput, Keyboard, ImageBackground, SafeAreaView } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useFonts } from 'expo-font';
import { useState } from 'react';
const { width, height } = Dimensions.get("window");
import { useLocalSearchParams, router } from "expo-router";

export default function Preview() {
    const [fontsLoaded] = useFonts({
        "PoppinsSemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
        "PoppinsRegular": require("../../assets/fonts/Poppins-Regular.ttf"),
        "ClickerScript": require("../../assets/fonts/ClickerScript-Regular.ttf"),
      });
    if (!fontsLoaded) {
        return null;
    }
    const { image, caption } = useLocalSearchParams();
    return (
        <View style={{width: width, height: height, backgroundColor: "#FFFFF7"}}>
            <ImageBackground source={{uri: image as string}} style={{width: width, height: hp("80%"), alignItems: "center"}}>
                <Text numberOfLines={3} style={{fontFamily: "ClickerScript", fontSize: (width + height) * 0.023, color: "#FFFFFF", 
                    marginTop: hp("60%"), width: wp("80%"), height: hp("20%")}} >{caption}</Text>
            </ImageBackground>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", gap: wp("10%")}}>
                <TouchableOpacity style={{
                    backgroundColor: "#9B59B6",
                    width: wp("40%"),
                    height: hp("5%"),
                    alignSelf: "center",
                    marginTop: hp("3%"),
                    borderRadius: 15,
                    justifyContent: "center",
                    alignItems: "center"
                }} onPress={() => router.back()}>
                    <Text style={{fontFamily: "PoppinsSemiBold", fontSize: (width + height) * 0.015, color: "#FFFFFF"}}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    backgroundColor: "#9B59B6",
                    width: wp("40%"),
                    height: hp("5%"),
                    alignSelf: "center",
                    marginTop: hp("3%"),
                    borderRadius: 15,
                    justifyContent: "center",
                    alignItems: "center"
                }} onPress={() => {console.log("create");
                }}>
                    <Text style={{fontFamily: "PoppinsSemiBold", fontSize: (width + height) * 0.015, color: "#FFFFFF"}}>Create</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}