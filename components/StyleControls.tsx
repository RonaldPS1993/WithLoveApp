import React from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"

const COLORS = ["#000000", "#2563eb", "#dc2626", "#16a34a", "#eab308", "#ffffff"];
const FONT_SIZES = [12, 14, 16, 18, 20, 22]

interface Props {
    color: string;
    fontSize: number;
    onColorChange: (color: string) => void;
    onFontSizeChange: (size: number) => void;
}

export default function StyleControls({color, fontSize, onColorChange, onFontSizeChange}: Props){
    return(
        <View style={styles.container}>
            <View style={styles.row}>
                <Feather name="type" style={{color: "#666", fontSize: wp("6%")}} />
                {FONT_SIZES.map((size) => (
                    <TouchableOpacity 
                        key={size} 
                        style={[styles.sizeButton, fontSize === size && styles.selectedButton]}
                        onPress={() => onFontSizeChange(size)}
                        />
                ))}
            </View>
            <View style={styles.row}>
                <Ionicons name="color-palette-outline" style={{color: "#666", fontSize: wp("6%")}} />
                {COLORS.map((c) => (
                    <TouchableOpacity 
                        key={c}
                        style={[styles.colorButton, {backgroundColor: c}, c === "#ffffff" && styles.whiteColorButton]}
                        onPress={() => onColorChange(c)}
                    >
                        {color === c && <View style={[styles.selectedColor, c === "#ffffff" && styles.selectedWhiteColor]} />}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 16,
        backgroundColor: "#ffffff",
        borderTopWidth: 1,
        borderTopColor: "#e5e5e5"
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12
    },
    sizeButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "#f4f4f5",
    },
    selectedButton: {
        backgroundColor: "#2563eb"
    },
    colorButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 0.5
    },
    selectedColor: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#ffffff"
    },
    whiteColorButton: {
        borderWidth: 1,
        borderColor: "#e5e5e5"
    },
    selectedWhiteColor: {
        backgroundColor: "#2563eb"
    },
})