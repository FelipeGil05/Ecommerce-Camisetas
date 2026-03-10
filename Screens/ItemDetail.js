import { View, Text, Image, Pressable, StyleSheet, ScrollView } from "react-native";
import { colors } from "../Global/colors";
import { useGetProductsQuery } from "../services/shopService";

export default function ItemDetail({ navigation, route }) {

    const productId = route?.params?.productId;
    const { data: allProducts, isLoading } = useGetProductsQuery();

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

                <Pressable style={styles.cartBtn}>
                    <Text style={styles.cartText}>
                        Agregar al carrito
                    </Text>
                </Pressable>
            </View>
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
        fontSize: 16,
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
    }
});
