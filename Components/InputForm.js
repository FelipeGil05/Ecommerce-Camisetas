import React from 'react'
import { Text, TextInput, View, StyleSheet } from 'react-native'
import { useState } from 'react';
import { colors } from '../Global/colors';

export default function InputForm({ label, onChange, error='', isSecure=false, style }) {
    const [input, setInput] = useState("");

    const onChangeText = (text) => {
        setInput(text);
        onChange(text);
    }

    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput 
            style={[styles.input, style]}
            value={input}
            onChangeText={ onChangeText } 
            secureTextEntry={isSecure}  
            placeholder={label}
            placeholderTextColor={colors.gris}
            />
            { error ? 
                <Text style={styles.error}>{ error }</Text>
                : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        width: "100%",
        marginBottom: 10
    },
    label: {
        fontSize: 14,
        marginBottom: 5,
        color: colors.verde
    },
    input: {
        width: "100%",
        backgroundColor: colors.amarillo,
        borderRadius: 8,
        padding: 10,
        borderWidth: 1,
        borderColor: colors.verde,
        fontSize: 14,
        color: colors.text,
        placeholderTextColor: colors.negro
    },
    error: {
        fontSize: 14,
        color: "red",
        marginTop: 4
    }
});