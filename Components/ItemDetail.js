import { View, Text, Image, Pressable, StyleSheet } from "react-native"
import { colors } from "../Global/colors"
import { useDispatch } from "react-redux"
import { addToCart } from "../store/cartSlice"
import { useGetProductsQuery } from "../services/shopService"

const ItemDetail = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { productId } = route.params
    const { data: products } = useGetProductsQuery()
    const product = products?.find(p => String(p.id) === String(productId))
    if (!product) return null

    return (
        <View style={styles.screen}>
            <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
                <Text style={styles.backText}>← Volver</Text>
            </Pressable>
            <Image source={{ uri: product.thumbnail }} style={styles.images} />
            <View>
                <Text style={styles.title}>{product.title}</Text>

                <Text>{product.description}</Text>

                <Text style={styles.price}>${product.price}</Text>
            </View>
            <Pressable
                style={styles.addBtn}
                onPress={() => {console.log(product); dispatch(addToCart(product))}}
            >
                <Text style={styles.addText}>
                    Agregar al carrito
                </Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.gris,
        padding: 16,
        paddingBottom: 100
    },
    images: {
        width: '100%',
        height: 260,
        borderRadius: 10
    },
    title: {
        color: colors.text,
        fontSize: 18,
        fontWeight: '700'
    },
    price: {
        color: colors.text,
        fontSize: 15,
        fontWeight: '500'
    },
    backText: {
        fontWeight: "700",
    },
    addBtn: {
        backgroundColor: colors.verde,
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10
    },
    addText: {
        color: "white",
        fontWeight: "900",
        fontSize: 16
    }
})

export default ItemDetail