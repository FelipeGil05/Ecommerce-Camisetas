import { Pressable, Text, StyleSheet } from "react-native";
import { colors } from "../Global/colors";

export default function CategoryItem({ item, navigation }) {
    return (
        <Pressable
            style={styles.card}
            onPress={() => navigation.navigate('ItemListCategory', { category: item })}
        >
            <Text style={styles.text}>{item.name}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.verde,
        padding: 14,
        borderRadius: 8,
        marginVertical: 8,
    },
    text: { fontSize: 16, fontWeight: "700", color: colors.text },
});
