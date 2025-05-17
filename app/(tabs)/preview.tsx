import { Text, View, Dimensions, Share, TouchableOpacity, ImageBackground, ActivityIndicator, Modal } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useFonts } from 'expo-font';
import { useState } from 'react';
const { width, height } = Dimensions.get("window");
import { useLocalSearchParams, router } from "expo-router";
import { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import * as Linking from 'expo-linking';

const MAINURL = 'https://withlove.expo.app/showMoment'


export default function Preview() {
    const [fontsLoaded] = useFonts({
        "PoppinsSemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
        "PoppinsRegular": require("../../assets/fonts/Poppins-Regular.ttf"),
        "ClickerScript": require("../../assets/fonts/ClickerScript-Regular.ttf"),
      });
    if (!fontsLoaded) {
        return null;
    }
    const [loading, setLoading] = useState<boolean>(false)
    const { image, caption, color, size } = useLocalSearchParams();
    const textColor = Array.isArray(color) ? color[0] : color || "black";

    const openShare = async (imageUrl: string) => {
        
            const myUrl = Linking.createURL(MAINURL, 
                { queryParams: {message: caption, imageUrl: imageUrl, color: textColor, size: size}}).replace(/^withlove:\/\//, '')
            // const myUrl = Linking.createURL("/showMoment", 
            //     { queryParams: {message: caption, imageUrl: imageUrl, color: textColor, size: size}})
            try {
                const result = await Share.share({
                  message:
                    'Someone has shared a moment with you',
                   url: myUrl 
                });
                if (result.action === Share.sharedAction) {
                    setLoading(false)
                  router.push("/(tabs)")
                } else if (result.action === Share.dismissedAction) {
                  // dismissed
                  setLoading(false)
                }
              } catch (error: any) {
                console.log(error);
              }
    }

    const shareMoment = async () => {
        setLoading(true)
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
                getDownloadURL(storageRef).then(async (url) => {
                    console.log("Image uploaded successfully:", url);
                    await openShare(url)
                });
            });
        } catch (error) {
            console.error("Error uploading image:", error);
        }
        

    }

    return (
        <View style={{width: width, height: height, backgroundColor: "#FFFFF7"}}>
            <ImageBackground source={{uri: image as string}} resizeMode="cover" 
            style={{width: width, height: hp("80%"), alignItems: "center"}}>
                <View>
                    <Text numberOfLines={4} style={{fontFamily: "ClickerScript", textAlign: "center", 
                    fontSize: (Number(size) * 2.5), color: textColor, 
                    marginTop: hp("60%"), width: wp("85%"), height: hp("20%")}} >{caption}</Text>
                </View>
            </ImageBackground>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", gap: wp("10%")}}>
                <TouchableOpacity style={{
                    backgroundColor: "#9B59B6",
                    width: wp("40%"),
                    height: hp("5%"),
                    alignSelf: "center",
                    marginTop: hp("3%"),
                    borderRadius: 25,
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
                    borderRadius: 25,
                    justifyContent: "center",
                    alignItems: "center"
                }} onPress={shareMoment}>
                    {loading ? <ActivityIndicator size={"small"} color={"#FFFFFF"} /> :  
                    <Text style={{fontFamily: "PoppinsSemiBold", fontSize: (width + height) * 0.015, color: "#FFFFFF"}}>Share</Text>}
                   
                </TouchableOpacity>
            </View>
        </View>
    )
}