import { useSelector, useDispatch } from 'react-redux';
import { Button, View, Text, StyleSheet } from 'react-native';
import { colors } from '../Global/colors';
import { logout } from '../store/features/authSlice';

export default function Account({ navigation }) {
    const { isLogged, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    return (
        <View style={styles.screen}>
            {isLogged ? (
                <>
                    <Text>Hola, {user?.name || 'Usuario'}!</Text>
                    <Button title="Cerrar sesión" onPress={() => dispatch(logout())} />
                </>
            ) : (
                <>
                    <Button title="Iniciar sesión" onPress={() => navigation.navigate('Login')} />
                    <Button title="Registrarse" onPress={() => navigation.navigate('Register')} />
                </>
            )}
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
    text: {
        color: colors.text,
        fontSize: 18,
    },
});