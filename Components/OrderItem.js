import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors } from "../Global/colors";

const formatDate = (timestamp) => {
    const d = new Date(timestamp);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};

const calcTotal = (items) => items.reduce((acc, i) => acc + (i.price ?? 0) * (i.quantity ?? 1), 0);

export default function OrderItem({ order, onRemove, onView }) {
    const total = calcTotal(order.items);
    return (
        <View style={styles.card}>
            <View style={styles.row}>
                <Text style={styles.title}>Order {order.id}</Text>
                <Text style={styles.meta}>{formatDate(order.createdAt)}</Text>
            </View>

            <Text style={styles.meta}>Items: {order.items.length} • Total: ${total.toFixed(2)}</Text>

            <View style={styles.actions}>
                <Pressable onPress={() => onView(order.id)}>
                    <Text style={styles.link}>View</Text>
                </Pressable>
                <Pressable onPress={() => onRemove(order.id)}>
                    <Text style={styles.remove}>Delete</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.negro,
        borderRadius: 12,
        padding: 12,
        marginVertical: 8,
        gap: 6,
    },
    row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    title: { color: "white", fontWeight: "900" },
    meta: { color: "white" },
    actions: { flexDirection: "row", justifyContent: "flex-end", gap: 16, marginTop: 6 },
    link: { color: "white", fontWeight: "800" },
    remove: { color: "#FF5C5C", fontWeight: "900" },
});
