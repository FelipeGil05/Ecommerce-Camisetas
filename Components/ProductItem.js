import { Pressable, Text, Image, StyleSheet, View, useWindowDimensions } from "react-native";
import { colors } from "../Global/colors";



export default function ProductItem({ item, navigation }) {
    const { width, height } = useWindowDimensions();

    return (
        <Pressable
            style={styles.card}
            onPress={() => navigation.navigate('ItemDetail', { productId: item.id })}
        >
            <Text
                style={width < 360 ? styles.titleMin : styles.title}
                numberOfLines={1}>
                {item.title}
            </Text>
            <View style={styles.thumbWrap}>
                <Image source={{ uri: item.thumbnail }} style={styles.thumb} />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.negro,
        borderRadius: 12,
        padding: 12,
        marginVertical: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    title: {
        color: "white",
        fontWeight: "700",
        flex: 1,
        marginRight: 12
    },
    titleMin: {
        color: "white",
        fontWeight: "500",
        margin: 0,
        fontSize: 12
    },
    thumbWrap: { width: 58, height: 58, borderRadius: 10, overflow: "hidden" },
    thumb: {
        width: "100%",
        height: "100%",
        resizeMode: "cover"
    },
});
