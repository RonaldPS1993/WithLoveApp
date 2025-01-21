import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Text, View, Dimensions, SafeAreaView, Image } from 'react-native';
import { useFonts } from 'expo-font';

const { width, height } = Dimensions.get("window");


export default function TabLayout() {
  const [fontsLoaded] = useFonts({
    "ClickerScript": require("../../assets/fonts/ClickerScript-Regular.ttf"),
    "PoppinsSemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
  });

  const CustomHeader = () => {
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
  };
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#9B59B6', tabBarInactiveTintColor:"#A3A3A3", tabBarStyle: { backgroundColor: '#DFF6E3' } }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: true,
          header: CustomHeader,
          tabBarLabelStyle: { fontFamily: "PoppinsSemiBold", fontSize: (width + height) * 0.008, marginTop: (width + height) * 0.002 },
          tabBarIcon: ({ color }) => {
            return (color == "#9B59B6" ? <Image source={require("../../assets/images/house_focused.png")} 
            style={{ width: (width + height) * 0.025, height: (width + height) * 0.025 }} /> 
            : <Image source={require("../../assets/images/house.png")} style={{ width: (width + height) * 0.025, height: (width + height) * 0.025 }} />)
          },
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
          tabBarLabelStyle: { fontFamily: "PoppinsSemiBold", fontSize: (width + height) * 0.008, marginTop: (width + height) * 0.002 },
          headerShown: true,
          header: CustomHeader,
          tabBarIcon: ({ color }) => {
            return (color == "#9B59B6" ? <Image source={require("../../assets/images/library_focused.png")} 
            style={{ width: (width + height) * 0.025, height: (width + height) * 0.025 }} /> 
              : <Image source={require("../../assets/images/library.png")} style={{ width: (width + height) * 0.025, height: (width + height) * 0.025 }} />)
          },
        }}
      />
    </Tabs>
  );
}
