import { Pressable, Text, StyleSheet, Image, View } from "react-native";
import { colors } from "../Global/colors";

export default function CategoryItem({ item, navigation }) {
    return (
        <Pressable
            style={styles.card}
            onPress={() => navigation.navigate('ItemListCategory', { category: item })}
        >
            <Image
                source={{ uri: item.image }}
                style={styles.image}
            />
            <View style={styles.overlay} />
            <Text style={styles.text}>{item.name}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        height: 180,
        borderRadius: 14,
        overflow: "hidden",
        marginBottom: 16
    },
    image: {
        width: "100%",
        height: "100%",
        position: "absolute"
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.4)"
    },
    text: {
        flex: 1,
        textAlign: "center",
        textAlignVertical: "center",
        color: colors.blanco,
        fontSize: 22, 
        fontWeight: "800", 
        letterSpacing: 1,
        marginTop: 8
    },
});
