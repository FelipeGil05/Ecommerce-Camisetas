import { Pressable, Text, Image, StyleSheet, View } from "react-native";
import { colors } from "../Global/colors";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ProductItem({ item, navigation }) {

    return (
        <Pressable
            style={styles.card}
            onPress={() => navigation.navigate('ItemDetail', { productId: item.id })}
        >
            <Image
                source={{ uri: item.thumbnail }}
                style={styles.image}
            />
            <View style={styles.info}>

                <Text style={styles.brand}>
                    {item.brand}
                </Text>

                <Text
                    style={styles.title}
                    numberOfLines={2}
                >
                    {item.title}
                </Text>

                <View style={styles.bottomRow}>

                    <Text style={styles.price}>
                        ${item.price}
                    </Text>

                    <Ionicons
                        name="chevron-forward"
                        size={20}
                        color={colors.amarillo}
                    />

                </View>

            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: colors.negro,
        borderRadius: 16,
        marginBottom: 14,
        marginHorizontal: 4,
        overflow: "hidden",
        shadowColor: colors.text,
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 6
    },
    image: {
        width: "100%",
        height: 180,
        resizeMode: "cover"
    },
    info: {
        padding: 14
    },
    brand: {
        color: colors.amarillo,
        fontSize: 12,
        fontWeight: "700",
        marginBottom: 4,
        textTransform: "uppercase"
    },
    title: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
        marginRight: 10
    },
    bottomRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    price: {
        color: colors.verde,
        fontSize: 18,
        fontWeight: "bold"
    }
});
