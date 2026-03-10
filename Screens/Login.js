import { StyleSheet, Text, View, Pressable } from 'react-native';
import { colors } from '../Global/colors';
import InputForm from '../Components/InputForm';
import { Ionicons } from '@expo/vector-icons';
import { Keyboard } from "react-native";
import { useLoginMutation } from '../services/authService';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, setError } from '../store/features/authSlice';

export default function Login({ navigation }) {

    const [loginUser] = useLoginMutation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const error = useSelector(state => state.auth.error);

    const OnSubmit = async () => {
        Keyboard.dismiss();

        if (!email || !password) {
            dispatch(setError("Completa todos los campos"));
            return;
        }

        if (password.length < 6) {
            dispatch(setError("La contraseña debe tener al menos 6 caracteres"));
            return;
        }

        dispatch(setError(null));

        try {
            const result = await loginUser({
                email,
                password
            }).unwrap();

            dispatch(login(result));

            navigation.navigate('Main', {
                screen: 'Shop',
                params: { screen: 'Home' }
            });
        } catch (error) {
            dispatch(setError("Credenciales incorrectas"));
        }
    }

    return (
        <View style={styles.main}>
            <Pressable style={styles.backButton}
                onPress={() =>
                    navigation.navigate('Main', {
                        screen: 'Shop',
                        params: { screen: 'Home' }
                    })
                }
            >
                <Ionicons name="arrow-back" size={26} color={colors.verde} />
            </Pressable>

            <View style={styles.container}>
                <Text style={styles.title}>Inicia sesión</Text>

                <InputForm label="Email" onChange={setEmail} error="" />
                <InputForm label="Contraseña" onChange={setPassword} error="" isSecure={true} />

                <Pressable style={styles.button} onPress={OnSubmit}>
                    <Text style={styles.buttonText}>Iniciar Sesion</Text>
                </Pressable>

                {error && <Text style={{ color: "red" }}>{error}</Text>}

                <Pressable onPress={() => {
                    Keyboard.dismiss();
                    navigation.navigate('Register');
                }} >
                    <Text style={styles.link}>¿No tienes cuenta? Registrate</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.blanco
    },
    container: {
        width: "85%",
        backgroundColor: colors.text,
        padding: 25,
        borderRadius: 15,
        alignItems: "center",
        gap: 15,
        shadowColor: colors.negro,
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 10,
        color: colors.verde,
        textAlign: "center"
    },
    link: {
        fontSize: 14,
        color: colors.amarillo,
        marginTop: 10,
        fontWeight: "500"
    },
    button: {
        width: "100%",
        backgroundColor: colors.verde,
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10
    },
    buttonText: {
        color: colors.blanco,
        fontSize: 16,
        fontWeight: "bold"
    },
    backButton: {
        position: "absolute",
        top: 60,
        left: 25
    }
});