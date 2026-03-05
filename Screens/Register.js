import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useState } from 'react';
import { colors } from '../Global/colors';
import InputForm from '../Components/InputForm';

export default function Register({ navigation }) {
    const OnSubmit = () => {
    }
    return (
        <View style={styles.main}>
            <View style={styles.constainer}>
                <Text style={styles.title}>Regístrate</Text>

                <InputForm label="Email" onChange={() => { }} error={''} />
                <InputForm label="Password" onChange={() => { }} error={''} isSecure={true} />
                <InputForm label="Confirm Password" onChange={() => { }} error={''} isSecure={true} />

                <Button title="Register" onPress={OnSubmit} />

                <Text style={styles.link}>¿Ya tenes una cuenta? Inicia sesión</Text>
                <Pressable onPress={() => navigation.navigate('Login')}
                >Login</Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        width: "80%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24
    },
    link: {
        fontSize: 14,
        color: 'blue'
    },
    constainer: {
        width: "90%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.amarillo,
        borderRadius: 10
    }
});