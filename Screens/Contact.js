import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../Global/colors';

export default function Contact() {
    return (
        <View style={styles.screen}>
            <Text style={styles.text}>Pantalla de contacto (a desarrollar).</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.gris,
    },
    text: {
        color: colors.text,
        fontSize: 18,
    },
});