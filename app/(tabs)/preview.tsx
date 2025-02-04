import { Text, View, Dimensions, Share, Image, TouchableOpacity, TextInput, Keyboard, ImageBackground, SafeAreaView } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useFonts } from 'expo-font';
import { useState } from 'react';
const { width, height } = Dimensions.get("window");
import { useLocalSearchParams, router } from "expo-router";
import { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import * as Linking from 'expo-linking';
// import Share from 'react-native-share';


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
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const shareMoment = async () => {
        try {
            const response = await fetch(image as string);
            const blob = await response.blob();
            const storageRef = ref(storage, `images/${new Date().getTime()}`);
            const uploadTask = uploadBytesResumable(storageRef, blob);
            uploadTask.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
            }, (error) => {
                console.log("Error uploading image:", error);
            }, () => {
                getDownloadURL(storageRef).then((url) => {
                    console.log("Image uploaded successfully:", url);
                    setImageUrl(url);
                });
            });
        } catch (error) {
            console.error("Error uploading image:", error);
        }
        if (imageUrl) {
            console.log(imageUrl);
            const myUrl = Linking.createURL("/showMoment", {scheme: "withlove", queryParams: {message: caption, imageUrl: imageUrl}})
            try {
                const result = await Share.share({
                  message:
                    'Someone has shared a moment with you',
                   url: myUrl 
                });
                if (result.action === Share.sharedAction) {
                  if (result.activityType) {
                    // shared with activity type of result.activityType
                  } else {
                    // shared
                  }
                } else if (result.action === Share.dismissedAction) {
                  // dismissed
                }
              } catch (error: any) {
                console.log(error);
              }
        }

    }
    return (
        <View style={{width: width, height: height, backgroundColor: "#FFFFF7"}}>
            <ImageBackground source={{uri: image as string}} resizeMode="cover" style={{width: width, height: hp("80%"), alignItems: "center"}}>
                <Text numberOfLines={3} style={{fontFamily: "ClickerScript", textAlign: "center", fontSize: (width + height) * 0.024, color: "#FFFFFF", 
                    marginTop: hp("60%"), width: wp("85%"), height: hp("20%")}} >{caption}</Text>
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
                }} onPress={shareMoment}>
                    <Text style={{fontFamily: "PoppinsSemiBold", fontSize: (width + height) * 0.015, color: "#FFFFFF"}}>Share</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}