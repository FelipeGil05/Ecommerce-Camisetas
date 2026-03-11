import { View, Text, Pressable, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { colors } from "../Global/colors";
import { increaseQuantity, decreaseQuantity } from "../store/cartSlice"

export default function Counter({ item }) {

    const dispatch = useDispatch();

    return (
        <View style={styles.container}>

            <Pressable
                style={styles.button}
                onPress={() => dispatch(decreaseQuantity(item.id))}
            >
                <Text style={styles.text}>-</Text>
            </Pressable>

            <Text style={styles.number}>{item.quantity}</Text>

            <Pressable
                style={styles.button}
                onPress={() => dispatch(increaseQuantity(item.id))}
            >
                <Text style={styles.text}>+</Text>
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    button: {
        width: 30,
        height: 30,
        backgroundColor: colors.negro,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 6
    },
    text: {
        color: colors.amarillo,
        fontWeight: "bold",
        fontSize: 16
    },
    number: {
        fontWeight: "bold",
        fontSize: 16,
        color: colors.blanco
    }
});