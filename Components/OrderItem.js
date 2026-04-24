import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors } from "../Global/colors";

const formatDate = (timestamp) => {
    if (!timestamp) return "Sin fecha";
    const d = new Date(timestamp);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
};

const calcTotal = (items) => {
    if (!items || !Array.isArray(items)) return 0;
    return items.reduce((acc, i) => acc + (i.price ?? 0) * (i.quantity ?? 1), 0);
};

export default function OrderItem({ order, onRemove, onView }) {
    const total = order.total ?? calcTotal(order.items);
    const itemCount = order.items?.length ?? 0;

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.title}>Pedido #{order.id?.slice(-6)}</Text>
                <Text style={styles.date}>{formatDate(order.createdAt)}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.itemsContainer}>
                {order.items?.slice(0, 3).map((item, index) => (
                    <View key={index} style={styles.itemRow}>
                        <Text style={styles.itemTitle} numberOfLines={1}>
                            {item.quantity}x {item.title}
                        </Text>
                        <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
                    </View>
                ))}
                {itemCount > 3 && (
                    <Text style={styles.moreItems}>+ {itemCount - 3} más...</Text>
                )}
            </View>

            <View style={styles.divider} />

            <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.negro,
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: { 
        color: colors.amarillo, 
        fontWeight: "900",
        fontSize: 16 
    },
    date: { 
        color: "#AAA", 
        fontSize: 12 
    },
    divider: {
        height: 1,
        backgroundColor: colors.negro,
        marginVertical: 12,
    },
    itemsContainer: {
        gap: 8,
    },
    itemRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    itemTitle: { 
        color: "#CCC", 
        fontSize: 14,
        flex: 1,
        marginRight: 8,
    },
    itemPrice: { 
        color: colors.blanco, 
        fontSize: 14,
        fontWeight: "600",
    },
    moreItems: {
        color: "#888",
        fontSize: 12,
        fontStyle: "italic",
        marginTop: 4,
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    totalLabel: { 
        color: colors.blanco, 
        fontSize: 16,
        fontWeight: "700",
    },
    totalValue: { 
        color: colors.verde, 
        fontSize: 20,
        fontWeight: "900",
    },
    actions: { 
        flexDirection: "row", 
        justifyContent: "flex-end", 
        gap: 20, 
        marginTop: 12 
    },
    link: { 
        color: colors.verde, 
        fontWeight: "800",
        fontSize: 14,
    },
    remove: { 
        color: "#FF5C5C", 
        fontWeight: "900",
        fontSize: 14,
    },
});
