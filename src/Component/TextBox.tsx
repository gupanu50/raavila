import { StyleSheet, View, TextInput } from 'react-native';
import React from 'react';
import { COLORS, FONT_FAMILIES } from '@/Configration';
import adjust from '@/Component/adjust';

export default function TextBox(props: any) {
    const { style, placeholder, value, setValue, validate, secure, num, length,error, containerStyle,editable } = props


    return (
        <View style={[styles.container,containerStyle]}>
            <TextInput
                style={[styles.input, style]}
                placeholder={placeholder}
                keyboardType={num ? 'phone-pad' : 'default'}
                placeholderTextColor={'grey'}
                maxLength={length ? length : 100}
                secureTextEntry={secure ? true : false}
                value={value}
                autoCapitalize='none'
                editable={editable}
                onChangeText={(txt) => { setValue(txt),error?error(null):null,validate? validate(txt):null }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: adjust(57),
        justifyContent: 'center'
    },
    input: {
        height: '70%',
        borderColor: COLORS.BORDER_COLOR,
        borderWidth: 1,
        borderRadius: adjust(5),
        paddingLeft: adjust(8),
        color: COLORS.DARK,
        fontSize: adjust(14),
        fontFamily: FONT_FAMILIES.AMERETTO,
        backgroundColor:COLORS.WHITE
    }
})