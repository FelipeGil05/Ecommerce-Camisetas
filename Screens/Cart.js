import { useMemo, useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import CartItem from "../Components/CartItem";
import { colors } from "../Global/colors";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../store/cartSlice";

export default function Cart() {
    const items = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const total = useMemo(() => {
        return items.reduce(
            (acc, it) => acc + (it.price ?? 0) * (it.quantity ?? 1),
            0
        );
    }, [items]);

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleConfirm = () => {
        dispatch(clearCart());
    };

    return (
        <View style={styles.screen}>
            <FlatList
                data={items}
                keyExtractor={(it) => String(it.id)}
                renderItem={({ item }) => <CartItem item={item} onRemove={handleRemove} />}
                contentContainerStyle={styles.list}
                ListEmptyComponent={<Text style={styles.empty}>Tu carrito está vacío</Text>}
            />

            <View style={styles.footer}>
                <View style={styles.totalRow}>
                    <Text style={styles.totalText}>Total</Text>
                    <Text style={styles.totalPrice}>${total.toFixed(2)}</Text>
                </View>

                <Pressable
                    style={[
                        styles.checkoutBtn,
                        items.length === 0 && styles.disabled
                    ]}
                    onPress={handleConfirm}
                    disabled={items.length === 0}
                >
                    <Text style={styles.checkoutText}>
                        Finalizar compra
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.gris
    },
    list: {
        padding: 16,
        paddingBottom: 120
    },
    empty: {
        textAlign: "center",
        marginTop: 60,
        fontWeight: "700",
        color: colors.text
    },
    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.text,
        paddingTop: 18,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 14
    },
    totalText: {
        color: colors.gris,
        fontSize: 16
    },
    totalPrice: {
        color: colors.blanco,
        fontSize: 20,
        fontWeight: "900"
    },
    checkoutBtn: {
        backgroundColor: colors.verde,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center"
    },
    checkoutText: {
        color: colors.blanco,
        fontWeight: "900",
        fontSize: 16
    },
    disabled: {
        opacity: 0.4
    }
});
