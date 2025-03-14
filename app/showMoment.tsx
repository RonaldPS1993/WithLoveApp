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
    color?: string;
    size?: number;
}

type QueryParams = {
    queryParams?: MomentProps;
}

type ParsedURL = {
    queryParams?: MomentProps;
}



export default function Moment(){
    // const [image, setImage] = useState<string|null>(null)
    // const [caption, setCaption] = useState<string>("")
    // const [textSize, setSize] = useState<number>(0)
    // const [textColor, setColor] = useState<string>("")
    const [moment, setMoment] = useState<MomentProps>({})
    const [loading, setLoading] = useState<boolean>(true)
    const [fontsLoaded] = useFonts({
        "PoppinsSemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        "PoppinsRegular": require("../assets/fonts/Poppins-Regular.ttf"),
        "ClickerScript": require("../assets/fonts/ClickerScript-Regular.ttf"),
    });

    const handleUrl = (event: { url: string }) => {
        const { queryParams } = Linking.parse(event.url) as ParsedURL;
        const { imageUrl, message, color, size } = queryParams || {};
        // setImage(imageUrl || null);
        // setCaption(message || "");
        // setColor(color || "white");
        // setSize(size || (width + height) * 0.024)
        setMoment({imageUrl: imageUrl || "", 
                   message: message || "", 
                   color: color || "white", 
                   size: size || (width + height) * 0.024
                 });
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
        <ImageBackground source={{uri: moment.imageUrl as string}} style={{width: wp("100%"), height: hp("100%"), alignItems: "center"}}>
            <Text numberOfLines={3} style={{fontFamily: "ClickerScript", textAlign: "center", 
            fontSize: Number(moment.size) * 2.5,
             color: moment.color as string, 
                    marginTop: hp("80%"), width: wp("85%"), height: hp("20%")}}>{moment.message}</Text>
        </ImageBackground>
    )

} 