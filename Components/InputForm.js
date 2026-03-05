import React from 'react'
import { Text, TextImput, View, StyleSheet } from 'react-native'
import { useState } from 'react';

export default function InputForm({ label, onChange, error='', isSecure=false }) {
    const [input, setInput] = useState("");

    const onChangeText = (text) => {
        setInput(text);
        onChange(text);
    }

    return (
        <View style={styles.inputContainer}>
            <Text style={styles.sub}>{label}</Text>
            <TextImput 
            styles={styles.input}
            value={input}
            onChangeText={ onChangeText } 
            secureTextEntry={isSecure}  
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
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    },
    sub: {
        width: "80%",
        fontSize: 14
    },
    input: {
        width: "80%",
        borderWidth: 0,
        borderBottomColor: colors.verde,
        fontSize: 14
    },
    error: {
        fontSize: 14,
        color: "red"
    }
});