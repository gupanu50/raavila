import React from 'react';
import { Text, TextInput, StyleSheet, View } from 'react-native';
import adjust from './adjust';
import { COLORS, FONT_FAMILIES } from '@/Configration';

const CustomInput = (props: any) => {
    const {
        field: { name, onBlur, onChange, value },
        form: { errors, touched, setFieldTouched }, setValue,handleChange,
        ...inputProps
    } = props

    const hasError = errors[name] && touched[name]

    return (
        <View style={[styles.container, props.multiline && { height: props.numberOfLines * adjust(28) }]}>
            <TextInput
                style={[
                    styles.textInput,
                    hasError && styles.errorInput, props.multiline && { height: props.numberOfLines * 30, textAlignVertical: 'top', padding: adjust(4),marginTop:adjust(4)}
                ]}
                value={value}
                onChangeText={(value) => {
                    setValue(value),
                    handleChange(name)(value)
                }}
                onBlur={() => {
                    setFieldTouched(name)
                    onBlur(name)
                }}
                {...inputProps}
            />
            {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: adjust(50),
        justifyContent: 'center'
    },
    textInput: {
        height: '80%',
        borderColor: COLORS.BORDER_COLOR,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: adjust(5),
        paddingLeft: adjust(8),
        color: COLORS.DARK,
        fontSize: adjust(14),
        fontFamily: FONT_FAMILIES.AMERETTO,
        backgroundColor: COLORS.WHITE
    },
    errorText: {
        fontSize: adjust(10),
        color: 'red',
        fontFamily: FONT_FAMILIES.AMERETTO
    },
    errorInput: {
        borderColor: 'red',
        marginTop: adjust(7)
    }
})

export default CustomInput
