import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { colors } from "../Global/colors";
import Counter from "./Counter";

export default function CartItem({ item, onRemove }) {
    return (
        <View style={styles.card}>
            <Image source={{ uri: item.thumbnail }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.price}>${item.price * item.quantity}</Text>
                <View style={styles.row}>
                    <Counter item={item}/>
                    <Pressable onPress={() => onRemove(item.id)}>
                        <Text style={styles.remove}>Eliminar</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.negro,
        borderRadius: 14,
        padding: 12,
        marginBottom: 14,
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10
    },
    info: {
        flex: 1,
        gap: 6
    },
    title: {
        color: colors.blanco,
        fontWeight: "700",
        fontSize: 15
    },
    price: {
        color: colors.amarillo,
        fontSize: 16,
        fontWeight: "900"
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    quantity: {
        color: "#ccc",
        fontSize: 13
    },
    remove: {
        color: "#dd4d4d",
        fontWeight: "800"
    }
});
