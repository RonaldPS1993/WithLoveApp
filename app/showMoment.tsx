import { Text, View, ImageBackground, Dimensions } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useFonts } from 'expo-font';
import { useState, useEffect, useCallback } from 'react';
const { width, height } = Dimensions.get("window");
import * as Linking from 'expo-linking';
import { router } from "expo-router"

type MomentProps = {
    imageUrl?: string;
    message?: string;
}

type QueryParams = {
    queryParams?: MomentProps;
}

type ParsedURL = {
    queryParams?: MomentProps;
}



export default function Moment(){
    const [image, setImage] = useState<string|null>(null)
    const [caption, setCaption] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(true)
    const [fontsLoaded] = useFonts({
        "PoppinsSemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        "PoppinsRegular": require("../assets/fonts/Poppins-Regular.ttf"),
        "ClickerScript": require("../assets/fonts/ClickerScript-Regular.ttf"),
    });

    const handleUrl = (event: { url: string }) => {
        const { queryParams } = Linking.parse(event.url) as ParsedURL;
        const { imageUrl, message } = queryParams || {};
        setImage(imageUrl || null);
        setCaption(message || "");
        setLoading(false)
        setTimeout(() => {
            router.push({
                pathname: "./(tabs)",
            })
        }, 10000)
    };
    
    const handleInitialUrl = async () => {
        try {
            const url = await Linking.getInitialURL();
            if (url) {
                handleUrl({ url });
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    useEffect(() => {
        handleInitialUrl();
    }, []);

    if (!fontsLoaded) {
        return null;
    }

    if(loading){
        return null
    }

    
    return(
        <ImageBackground source={{uri: image as string}} style={{width: wp("100%"), height: hp("100%"), alignItems: "center"}}>
            <Text numberOfLines={3} style={{fontFamily: "ClickerScript", textAlign: "center", fontSize: (width + height) * 0.024, color: "#FFFFFF", 
                    marginTop: hp("80%"), width: wp("85%"), height: hp("20%")}}>{caption}</Text>
        </ImageBackground>
    )

} 