import { useMemo, useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet, Alert } from "react-native";
import CartItem from "../Components/CartItem";
import { colors } from "../Global/colors";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../store/cartSlice";
import { saveOrder } from "../firebase/ordersDb";
import CheckoutModal from "../Components/CheckoutModal";

export default function Cart() {
    const items = useSelector(state => state.cart.items);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const total = useMemo(() => {
        return items.reduce(
            (acc, it) => acc + (it.price ?? 0) * (it.quantity ?? 1),
            0
        );
    }, [items]);

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleCheckout = () => {
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
    };

    const handleModalConfirm = async (formData) => {
        if (!user?.uid) {
            Alert.alert("Error", `Debes iniciar sesión. User: ${JSON.stringify(user)}`);
            setModalVisible(false);
            return;
        }
        setLoading(true);
        const order = {
            items: items.map(item => ({
                id: item.id,
                title: item.title,
                price: item.price,
                quantity: item.quantity,
                image: item.image
            })),
            total: items.reduce((acc, it) => acc + (it.price ?? 0) * (it.quantity ?? 1), 0),
            datosCliente: formData
        };
        try {
            await saveOrder(user.uid, order);
            dispatch(clearCart());
            setModalVisible(false);
            Alert.alert("Éxito", "Tu pedido ha sido confirmado!");
        } catch (error) {
            Alert.alert("Error", "No se pudo guardar el pedido");
        } finally {
            setLoading(false);
        }
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
                    onPress={handleCheckout}
                    disabled={items.length === 0}
                >
                    <Text style={styles.checkoutText}>
                        Finalizar compra
                    </Text>
                </Pressable>
            </View>
            <CheckoutModal
                visible={modalVisible}
                onClose={handleModalClose}
                onConfirm={handleModalConfirm}
                isLoading={loading}
            />
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
