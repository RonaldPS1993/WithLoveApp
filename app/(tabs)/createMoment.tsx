import { Text, View, Dimensions, StyleSheet, Image, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useFonts } from 'expo-font';
import { useState } from 'react';
const { width, height } = Dimensions.get("window");
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router";
import StyleControls from "@/components/StyleControls";
import { useEditorStore } from "@/store/editor-store";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons"

export default function CreateMoment() {
  const [fontsLoaded] = useFonts({
    "PoppinsSemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
    "PoppinsRegular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>("");
  const {color, fontSize, setColor, setFontSize} = useEditorStore()
  if (!fontsLoaded) {
    return null;
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={{width: width, height: "100%", backgroundColor: "#FFFFF7"}}>
      <TextInput 
        value={caption}
        placeholderTextColor="#8A8A8A" 
        style={[styles.input, {color, fontSize}]} 
        multiline={true}
        placeholder="Write something special..." 
        maxLength={80}
        onChangeText={(text) => setCaption(text)}
      />
      <TouchableOpacity 
        style={{
          width: wp("90%"),
          height: hp("40%"),
          backgroundColor: image ? undefined : '#f4f4f5',
          alignSelf: "center",
          marginTop: hp("2%"),
          borderRadius: 15,
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: hp("2%")
        }}
        onPress={async () => {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            quality: 1,
            aspect: [4, 3],
          });

          if (!result.canceled) {
            // Handle the selected image
            const selectedImage = result.assets[0];
            setImage(selectedImage.uri);
          }
        }}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain"
            }}
          />
        ): 
        <View>
          <MaterialIcons name="file-image-plus" style={{color: "#666", fontSize: wp("15%")}} />
        </View>}
      </TouchableOpacity>
      <StyleControls color={color} fontSize={fontSize} onColorChange={setColor} onFontSizeChange={setFontSize} />
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
          caption: caption, 
          color: color,
          size: fontSize
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

const styles = StyleSheet.create({
  input: {
    fontFamily: "PoppinsRegular",
    width: wp("90%"), 
    height: hp("10%"), 
    marginTop: hp("2%"),
    borderWidth: 1, 
    borderColor: "#000000", 
    borderRadius: 15, 
    textAlign: "left", 
    padding: 10, 
    alignSelf: "center",
    backgroundColor: "#dcdcdc"
  }
})