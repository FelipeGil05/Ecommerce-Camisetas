import { View, Text, Image, Pressable, StyleSheet, useWindowDimensions } from "react-native";
import { colors } from "../Global/colors";
import { useGetProductsQuery } from "../services/shopService";

export default function ItemDetail({ navigation, route }) {
    const { width, height } = useWindowDimensions();
    const isPortrait = height >= width;

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
                <Text style={styles.title}>Cargando producto...</Text>
            </View>
        );
    }

    if (!product) {
        return (
            <View style={styles.screen}>
                <Text style={styles.title}>Producto no encontrado</Text>
                <Pressable onPress={() => navigation.goBack()}>
                    <Text style={styles.backText}>Volver</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <Pressable 
                style={({ pressed }) => [
                    styles.backBtn,
                    pressed && styles.backBtnPressed
                ]} 
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backText}>← Volver</Text>
            </Pressable>

            <View style={[styles.content, !isPortrait && styles.contentLandscape]}>
                <Image
                    source={{ uri: product.thumbnail }}
                    style={[styles.image, !isPortrait && styles.imageLandscape]}
                />

                <View style={[styles.info, !isPortrait && styles.infoLandscape]}>
                    <Text style={styles.title}>{product.title}</Text>
                    {!!product.description && <Text style={styles.desc}>{product.description}</Text>}
                    {!!product.price && <Text style={styles.price}>${product.price}</Text>}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.gris, padding: 16 },

    backBtn: { 
        alignSelf: "flex-start",
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: colors.primary || colors.negro,
        borderRadius: 8,
        marginBottom: 16,
    },
    backBtnPressed: {
        opacity: 0.7,
    },
    backText: { 
        color: "white", 
        fontWeight: "700",
        fontSize: 16,
    },

    content: { flex: 1, gap: 12 },
    contentLandscape: { flexDirection: "row", alignItems: "flex-start" },

    image: { width: "100%", height: 260, borderRadius: 12 },
    imageLandscape: { width: 260, height: 260 },

    info: { gap: 8 },
    infoLandscape: { flex: 1 },

    title: { color: colors.textPrimary ?? colors.text, fontSize: 20, fontWeight: "800" },
    desc: { color: colors.textSecondary ?? colors.text, lineHeight: 20 },
    price: { color: colors.primary ?? colors.text, fontSize: 18, fontWeight: "800" },
});
