import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { COLORS, FONT_FAMILIES } from '@/Configration';
import React from 'react';
import adjust from './adjust';

export default function CustomButton(props:any) {
    const{press,style,label,txtStyle,containerStyle,...inputProps} = props;
  return (
    <View style={[styles.container,containerStyle]}>
        <TouchableOpacity style={[styles.btn,style]} onPress={press} {...inputProps} >
            <Text style={[styles.txt,txtStyle]}>{label}</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        height:adjust(50),
    },
    btn:{
        backgroundColor:COLORS.MAIN,
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    txt:{
        color:'white',
        fontSize:adjust(15),
        fontFamily:FONT_FAMILIES.AMERETTO
    }
})