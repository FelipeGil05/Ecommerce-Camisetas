import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../Global/colors';

export default function Account() {
    return (
        <View style={styles.screen}>
            <Text style={styles.text}>Mi cuenta (componente en construcción)</Text>
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