import { Text, View, ImageBackground, Dimensions } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useFonts } from 'expo-font';
import { useState, useEffect, useCallback } from 'react';
const { width, height } = Dimensions.get("window");
import * as Linking from 'expo-linking';
import { router } from "expo-router"
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';

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

type ContextType = {
    startY: number;
};



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

    const translateY = useSharedValue(0);

    const navigateHome = () => {
      router.push({
        pathname: "./(tabs)",
      })
    };
    

    const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationY > 0) {
        translateY.value = event.translationY;
      }
    })
    .onEnd((event) => {
      if (event.translationY > 200) {
        runOnJS(navigateHome)();
      } else {
        translateY.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
    
    useEffect(() => {
        handleInitialUrl();
    }, []);

    if (!fontsLoaded) {
        return null;
    }

    if(!moment.imageUrl){
        return null
    }

    
    return(
        <GestureHandlerRootView style={{ flex: 1 }}>
          <GestureDetector gesture={panGesture}>
            <Animated.View style={[{ flex: 1 }, animatedStyle]}>
              <ImageBackground source={{uri: moment.imageUrl as string}} style={{width: wp("100%"), height: hp("100%"), alignItems: "center"}}>
                <Text numberOfLines={3} style={{fontFamily: "ClickerScript", textAlign: "center", 
                fontSize: Number(moment.size) * 2.5,
                color: moment.color as string, 
                        marginTop: hp("80%"), width: wp("85%"), height: hp("20%")}}>{moment.message}</Text>
              </ImageBackground>
            </Animated.View>
          </GestureDetector>
        </GestureHandlerRootView>
    )

} 