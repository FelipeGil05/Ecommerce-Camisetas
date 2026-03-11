import { View, Text, Image, Pressable, StyleSheet, ScrollView, Animated } from "react-native";
import { colors } from "../Global/colors";
import { useGetProductsQuery } from "../services/shopService";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function ItemDetail({ navigation, route }) {
    const dispatch = useDispatch();
    const productId = route?.params?.productId;
    const { data: allProducts, isLoading } = useGetProductsQuery();
    const [showToast, setShowToast] = useState(false);
    const toastAnim = useRef(new Animated.Value(100)).current;
    const user = useSelector(state => state.auth.user);
    const [toastType, setToastType] = useState("success");
    const toastOpacity = useRef(new Animated.Value(0)).current;

    let product = null;
    if (allProducts) {
        const productsArray = Array.isArray(allProducts)
            ? allProducts
            : Object.values(allProducts);

        product = productsArray.find((p) => String(p.id) === String(productId));
    }

    if (isLoading) {
        return (
            <View style={styles.screen}>
                <Text style={styles.loading}>Cargando producto...</Text>
            </View>
        );
    }

    if (!product) {
        return (
            <View style={styles.screen}>
                <Text style={styles.loading}>Producto no encontrado</Text>
            </View>
        );
    }

    const handleAddToCart = () => {
        if (!user) {

            setToastType("error");
            setShowToast(true);

            Animated.parallel([
                Animated.timing(toastAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true
                }),
                Animated.timing(toastOpacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true
                })
            ]).start();

            setTimeout(() => {
                Animated.parallel([
                    Animated.timing(toastAnim, {
                        toValue: 100,
                        duration: 300,
                        useNativeDriver: true
                    }),
                    Animated.timing(toastOpacity, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true
                    })
                ]).start(() => setShowToast(false));
            }, 2200);
            return;
        }

        dispatch(addToCart(product));

        setToastType("success");
        setShowToast(true);

        Animated.parallel([
            Animated.timing(toastAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }),
            Animated.timing(toastOpacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            })
        ]).start();

        setTimeout(() => {
            Animated.parallel([
                Animated.timing(toastAnim, {
                    toValue: 100,
                    duration: 300,
                    useNativeDriver: true
                }),
                Animated.timing(toastOpacity, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true
                })
            ]).start(() => setShowToast(false));
        }, 2200);
    };

    return (
        <ScrollView style={styles.screen}>

            <Pressable
                style={styles.backBtn}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backText}>← Volver</Text>
            </Pressable>

            <Image
                source={{ uri: product.thumbnail }}
                style={styles.image}
            />

            <View style={styles.info}>

                <Text style={styles.brand}>
                    {product.brand}
                </Text>

                <Text style={styles.title}>
                    {product.title}
                </Text>

                <Text style={styles.price}>
                    ${product.price}
                </Text>

                {!!product.description && (
                    <Text style={styles.desc}>
                        {product.description}
                    </Text>
                )}

                <Pressable
                    style={styles.cartBtn}
                    onPress={handleAddToCart}
                >
                    <Text style={styles.cartText}>
                        Agregar al carrito
                    </Text>
                </Pressable>
            </View>

            {showToast && (
                <Animated.View
                    style={[
                        styles.toast,
                        toastType === "error" && styles.toastError,
                        {
                            transform: [{ translateY: toastAnim }],
                            opacity: toastOpacity
                        }
                    ]}
                >
                    <Pressable
                        style={styles.toastContent}
                        onPress={() => {
                            if (toastType === "error") {
                                navigation.navigate("Login");
                            }
                        }}
                    >
                        <Ionicons
                            name={toastType === "success" ? "checkmark-circle" : "warning"}
                            size={22}
                            color="white"
                            style={styles.toastIcon}
                        />

                        <Text style={styles.toastText}>
                            {toastType === "success"
                                ? `${product.title} agregado al carrito`
                                : "Debes iniciar sesión • Toca aquí"}
                        </Text>
                    </Pressable>
                </Animated.View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.gris,
    },
    loading: {
        marginTop: 40,
        textAlign: "center"
    },
    backBtn: {
        marginTop: 20,
        marginLeft: 16,
        paddingBlockEnd: 16
    },
    backText: {
        color: colors.verde,
        fontWeight: "700",
        fontSize: 16
    },
    image: {
        width: "100%",
        height: 320,
        resizeMode: "contain",
        backgroundColor: colors.blanco
    },
    info: {
        padding: 18
    },
    brand: {
        color: colors.verde,
        fontSize: 13,
        fontWeight: "700",
        textTransform: "uppercase",
        marginBottom: 6
    },
    title: {
        fontSize: 22,
        fontWeight: "800",
        color: colors.text,
        marginBottom: 10
    },
    price: {
        fontSize: 24,
        fontWeight: "bold",
        color: colors.verde,
        marginBottom: 16
    },
    desc: {
        color: colors.text,
        lineHeight: 22,
        marginBottom: 24
    },
    cartBtn: {
        backgroundColor: colors.amarillo,
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: "center"
    },
    cartText: {
        fontWeight: "700",
        fontSize: 16,
        color: colors.negro
    },
    toast: {
        position: "absolute",
        bottom: 30,
        left: 20,
        right: 20,
        backgroundColor: colors.verde,
        paddingVertical: 14,
        paddingHorizontal: 18,
        borderRadius: 14,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 6
    },
    toastText: {
        color: colors.blanco,
        fontWeight: "bold"
    },
    toastError: {
        backgroundColor: "#e74c3c"
    },
    toastContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8
    },
    toastIcon: {
        marginRight: 6
    },
});
