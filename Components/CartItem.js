import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { colors } from "../Global/colors";

export default function CartItem({ item, onRemove }) {
    return (
        <View style={styles.card}>
            <Image source={{ uri: item.thumbnail }} style={styles.thumb} />
            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.meta}>Qty: {item.quantity}</Text>
                <Text style={styles.meta}>${item.price}</Text>
            </View>

            <Pressable onPress={() => onRemove(item.id)}>
                <Text style={styles.remove}>Remove</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.verde,
        borderRadius: 12,
        padding: 12,
        marginVertical: 8,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    thumb: { width: 56, height: 56, borderRadius: 10 },
    info: { flex: 1, gap: 2 },
    title: { fontWeight: "800", color: colors.text },
    meta: { color: colors.text },
    remove: { fontWeight: "800", color: "#8B0000" },
});
