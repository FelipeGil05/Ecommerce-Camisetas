import { FlatList, View, StyleSheet, Text } from "react-native";
import CategoryItem from "./CategoryItem";
import { colors } from "../Global/colors";
import { useGetCategoriesQuery } from "../services/shopService";

export default function Categories({ navigation }) {

    const { data:categories, isLoading, error } = useGetCategoriesQuery();

    return (
        <View style={styles.container}>
            <FlatList
                data={categories}
                keyExtractor={(it) => it.id}
                renderItem={({ item }) => (
                    <CategoryItem item={item} navigation={navigation} />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gris,
        padding: 16
    },
});
