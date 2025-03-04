import { Text, View, Dimensions, StyleSheet, Image, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useFonts } from 'expo-font';
import { useState } from 'react';
const { width, height } = Dimensions.get("window");
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router";

export default function CreateMoment() {
  const [fontsLoaded] = useFonts({
    "PoppinsSemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
    "PoppinsRegular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>("");
  if (!fontsLoaded) {
    return null;
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={{width: width, height: "100%", backgroundColor: "#FFFFF7"}}>
      <TextInput 
      placeholderTextColor="#8A8A8A" 
      style={{fontFamily: "PoppinsRegular", fontSize: (width + height) * 0.01, color: "#4A4A4A",
         width: width * 0.9, height: height * 0.05, marginTop: height * 0.05, marginLeft: width * 0.05,
         borderWidth: 1, borderColor: "#9B59B6", borderRadius: 15, textAlign: "left", paddingLeft: 10, paddingRight: 10}} 
         multiline={true}
      placeholder="Write something special..." 
      maxLength={80}
      onChangeText={(text) => setCaption(text)}
      />
      <TouchableOpacity 
        onPress={async () => {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            quality: 1,
            allowsEditing: true,
            aspect: [4, 3],
          });

          if (!result.canceled) {
            // Handle the selected image
            const selectedImage = result.assets[0];
            setImage(selectedImage.uri);
          }
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#DFF6E3',
          padding: wp("3%"),
          borderRadius: 15,
          marginTop: hp("5%"),
          width: wp("50%"),
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        <Image 
          source={require("../../assets/images/gallery.png")}
          style={{
            width: wp("7%"),
            height: wp("7%"),
            marginRight: wp("2%")
          }}
        />
        <Text style={{
          fontFamily: "PoppinsRegular",
          fontSize: (width + height) * 0.012,
          color: "#4A4A4A"
        }}>
          Add Image
        </Text>
      </TouchableOpacity>
      <View style={{
        width: wp("90%"),
        height: hp("40%"),
        backgroundColor: image ? undefined : '#DFF6E3',
        alignSelf: "center",
        marginTop: hp("5%"),
        borderRadius: 15,
        overflow: "hidden"
      }}>
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain"
            }}
          />
        )}
      </View>
      <TouchableOpacity style={{
        backgroundColor: "#9B59B6",
        width: wp("50%"),
        height: hp("5%"),
        alignSelf: "center",
        marginTop: hp("3%"),
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center"
      }} onPress={() => router.push({
        pathname: "./preview",
        params: {
          image: image,
          caption: caption
        }
      })}>
        <Text style={{fontFamily: "PoppinsSemiBold", fontSize: (width + height) * 0.012, color: "#FFFFF7"}}>
          Preview
        </Text>
      </TouchableOpacity>
    </View>
    </TouchableWithoutFeedback>
  );
}
