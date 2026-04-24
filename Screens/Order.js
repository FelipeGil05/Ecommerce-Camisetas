import { useState, useEffect, useCallback } from "react";
import { View, FlatList, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import OrderItem from "../Components/OrderItem";
import { getOrders, deleteOrder } from "../firebase/ordersDb";
import { colors } from "../Global/colors";
import { useSelector } from "react-redux";

export default function OrdersScreen() {
    const user = useSelector(state => state.auth.user);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadOrders = useCallback(async () => {
        if (!user?.uid) {
            setOrders([]);
            setLoading(false);
            return;
        }
        
        try {
            setLoading(true);
            const userOrders = await getOrders(user.uid);
            setOrders(userOrders);
        } catch (error) {
            console.error("Error cargando ordene:", error);
        } finally {
            setLoading(false);
        }
    }, [user?.uid]);

    useFocusEffect(
        useCallback(() => {
            loadOrders();
        }, [loadOrders])
    );

    const handleRemove = async (id) => {
        if (!user?.uid) return;
        try {
            await deleteOrder(user.uid, id);
            setOrders((prev) => prev.filter((o) => o.id !== id));
        } catch (error) {
            console.error("Error eliminando orden:", error);
        }
    };

    const handleView = (_id) => {
    };

    return (
        <>
        {
            loading
            ?
            <ActivityIndicator />
            :
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
        }
        </>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.gris },
    content: { flex: 1, padding: 16 },
    empty: { textAlign: "center", marginTop: 20, fontWeight: "700", color: colors.text },
});