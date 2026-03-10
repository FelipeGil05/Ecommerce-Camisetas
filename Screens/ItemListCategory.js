import React, { useMemo, useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Text, Pressable } from "react-native";

import ProductItem from "../Components/ProductItem";
import { colors } from "../Global/colors";

import { useGetProductsByCategoryQuery, useGetProductsQuery } from "../services/shopService";

export default function ItemListCategory({ navigation, route }) {
    const category = route?.params?.category;
    const initialKeyword = route?.params?.q ?? "";

    const [keyword, setKeyword] = useState(initialKeyword);
    const hasNumbers = useMemo(() => /\d/.test(keyword), [keyword]);

    useEffect(() => {
        if (route?.params?.q !== undefined) {
            setKeyword(route.params.q);
        }
    }, [route?.params?.q]);

    const { data: allProducts, isLoading: loadingAll } = useGetProductsQuery();

    const productsData = allProducts;
    const isLoading = loadingAll;

    const products = useMemo(() => {
        if (!productsData) return [];

        const allItems = Array.isArray(productsData)
            ? productsData
            : Object.values(productsData);

        let base = allItems;
        if (category?.id) {
            base = allItems.filter((p) => p.categoryId === category.id);
        }

        return hasNumbers
            ? base
            : base.filter((p) =>
                p.title.toLowerCase().includes(keyword.trim().toLowerCase())
            );
    }, [productsData, category, keyword, hasNumbers]);
    if (isLoading) {
        return (
            <View style={styles.screen}>
                <Text>Cargando productos...</Text>
            </View>
        );
    }

    if (!isLoading && products.length === 0) {
        return (
            <View style={styles.screen}>
                <View style={styles.content}>
                    <Text style={styles.emptyText}>
                        {category ? "No hay productos en esta categoría." : "No hay productos."}
                    </Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <View style={styles.content}>
                <Pressable
                    style={styles.backBtn}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backText}>← Volver</Text>
                </Pressable>

                {category && (
                    <Text style={styles.categoryName}>
                        {category.name}
                    </Text>
                )}
                <FlatList
                    data={products}
                    keyExtractor={(it) => String(it.id)}
                    renderItem={({ item }) => (
                        <ProductItem item={item} navigation={navigation} />
                    )}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.gris,
    },
    content: {
        flex: 1,
        padding: 16,
        gap: 12,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        color: colors.text,
    },
    categoryName: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
        color: colors.verde,
        textAlign: "center"
    },
    backText: {
        color: colors.verde,
        fontWeight: "700",
        fontSize: 16,
    },
});