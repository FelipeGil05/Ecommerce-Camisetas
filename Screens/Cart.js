import { useMemo, useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";

import CartItem from "../Components/CartItem";
import { cartItems as cartMock } from "../Data/cart";
import { colors } from "../Global/colors";

export default function Cart() {
    const [items, setItems] = useState(cartMock);

    const total = useMemo(() => {
        return items.reduce((acc, it) => acc + (it.price ?? 0) * (it.quantity ?? 1), 0);
    }, [items]);

    const handleRemove = (id) => {
        setItems((prev) => prev.filter((i) => String(i.id) !== String(id)));
    };

    const handleConfirm = () => {
        // Por ahora es un mock
        setItems([]);
    };

    return (
        <View style={styles.screen}>
            <View style={styles.content}>
                <FlatList
                    data={items}
                    keyExtractor={(it) => String(it.id)}
                    renderItem={({ item }) => <CartItem item={item} onRemove={handleRemove} />}
                    ListEmptyComponent={<Text style={styles.empty}>No hay items en el carrito.</Text>}
                />

                <View style={styles.footer}>
                    <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
                    <Pressable style={styles.btn} onPress={handleConfirm} disabled={items.length === 0}>
                        <Text style={styles.btnText}>Confirm</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.gris },
    content: { flex: 1, padding: 16 },
    empty: { textAlign: "center", marginTop: 20, fontWeight: "700", color: colors.text },
    footer: { paddingTop: 12, gap: 10 },
    total: { fontWeight: "900", fontSize: 16, color: colors.text },
    btn: {
        backgroundColor: colors.negro,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        opacity: 1,
    },
    btnText: { color: "white", fontWeight: "900" },
});
