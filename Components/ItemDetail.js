import { View, Text, Image, Pressable, StyleSheet } from "react-native"
import { colors } from "../Global/colors"

const ItemDetail = ({ product, onGoBack }) => {
    return (
        <View style={styles.screen}>
            <Pressable style={styles.backText}>
                <Text onPress={onGoBack}> Go Back </Text>
            </Pressable>
            <Image source={{ uri: product.thumbnail }} style={styles.images} />
            <View>
                <Text style={styles.title} > {product.title} </Text>

                <Text> {product.description} </Text>

                <Text style={styles.price}> {product.price}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.bg,
        padding: 16
    },
    images: {
        width: '100%',
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
        fontWeight: "700"
    }
})

export default ItemDetail