import { useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";

import OrderItem from "../Components/OrderItem";
import { orders as ordersMock } from "../Data/orders";
import { colors } from "../Global/colors";

export default function OrdersScreen() {
    const [orders, setOrders] = useState(ordersMock);

    const handleRemove = (id) => {
        setOrders((prev) => prev.filter((o) => o.id !== id));
    };

    const handleView = (_id) => {
    };

    return (
        <View style={styles.screen}>
            <View style={styles.content}>
                <FlatList
                    data={orders}
                    keyExtractor={(it) => it.id}
                    renderItem={({ item }) => (
                        <OrderItem order={item} onRemove={handleRemove} onView={handleView} />
                    )}
                    ListEmptyComponent={<Text style={styles.empty}>Todavía no hay órdenes.</Text>}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.gris },
    content: { flex: 1, padding: 16 },
    empty: { textAlign: "center", marginTop: 20, fontWeight: "700", color: colors.text },
});
