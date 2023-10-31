import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import adjust from './adjust';
import { COLORS, FONT_FAMILIES } from '@/Configration';

export default function SocialButton(props: any) {
    const { press, style, label, txtStyle, img, imgStyle,containerStyle,disable} = props;
    return (
        <View style={[styles.container,containerStyle]}>
            <TouchableOpacity style={[styles.btn, style]} onPress={press} disabled={disable?disable:false}>
                {img ? <Image source={img} style={[styles.img, imgStyle]} /> : null}
                <Text style={[styles.txt, txtStyle]}>{label}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '10%',
        justifyContent: 'center',
        // backgroundColor: 'green'
    },
    btn: {
        backgroundColor: COLORS.MAIN,
        height: '70%',
        borderRadius: 30,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    txt: {
        color: 'white',
        fontSize: adjust(14),
        fontFamily: FONT_FAMILIES.AMERETTO
    },
    img: {
        height: adjust(25)
    }
})