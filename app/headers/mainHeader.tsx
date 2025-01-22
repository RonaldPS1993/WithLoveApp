import { Text, View, Dimensions, SafeAreaView, Image } from 'react-native';
import { useFonts } from 'expo-font';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const { width, height } = Dimensions.get("window");

export default function MainHeader() {
    return (
        <View style={{
          height: height * 0.13,
          backgroundColor: '#DFF6E3',
        }}>
          <SafeAreaView style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Image source={require("../../assets/images/withlovelogo.png")} style={{ width: width * 0.1, height: width * 0.1, marginLeft: width * 0.05 }} />
            <Text style={{
              fontSize: (width + height) * 0.025,
              color: '#9B59B6',
              fontFamily: "ClickerScript"
            }}>
            With Love
          </Text>
          </SafeAreaView>
        </View>
      );
}