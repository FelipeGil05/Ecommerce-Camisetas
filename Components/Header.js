import { View, Text, StyleSheet, Pressable, TextInput, Image, Modal } from "react-native";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from "../Global/colors";
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { useGetCategoriesQuery } from "../services/shopService";

export default function Header() {
    const navigation = useNavigation();
    const [query, setQuery] = useState("");
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const search = () => {
        navigation.navigate('Shop', {
            screen: 'ItemListCategory',
            params: { q: query, category: null },
        });
        setQuery('');
    };

    const clearSearch = () => {
        navigation.navigate('Shop', {
            screen: 'ItemListCategory',
            params: { q: '', category: null },
        });
        setQuery('');
    };

    const goHome = () => navigation.navigate('Shop', { screen: 'Home' });
    const goProducts = () => navigation.navigate('Shop', { screen: 'ItemListCategory', params: { q: '', category: null } });

    const { data: categories = [] } = useGetCategoriesQuery();

    return (
        <View style={styles.container}>

            <View style={styles.topRow}>

                <Pressable onPress={goHome}>
                    <Image
                        source={require("../assets/images/logoPasion90_transparent.png")}
                        style={styles.logo}
                    />
                </Pressable>

                <View style={styles.actions}>
                    <Pressable style={styles.actionItem} onPress={() => navigation.navigate('Shop', { screen: 'Account' })}>
                        <Ionicons name="person-outline" size={24} color={colors.blanco} />
                        <Text style={styles.actionText}>Mi cuenta</Text>
                    </Pressable>

                    <Pressable style={styles.actionItem} onPress={() => navigation.navigate('Cart')}>
                        <Ionicons name="cart-outline" size={24} color={colors.blanco} />
                        <Text style={styles.actionText}>Mi carrito</Text>
                    </Pressable>
                </View>
            </View>

            <View style={styles.searchRow}>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        value={query}
                        onChangeText={setQuery}
                        onSubmitEditing={search}
                        placeholder="¿Qué estás buscando?"
                        placeholderTextColor="#aaa"
                    />
                    {query.length > 0 && (
                        <Pressable onPress={clearSearch} style={styles.clearButton}>
                            <Ionicons name="close" size={20} color={colors.blanco} />
                        </Pressable>
                    )}
                    <Pressable onPress={search} style={styles.searchButton}>
                        <EvilIcons name="search" size={24} color={colors.blanco} />
                    </Pressable>
                </View>
            </View>

            <View style={styles.menuRow}>
                <Pressable onPress={() => setDropdownVisible(true)} style={styles.menuButton}>
                    <Ionicons name="menu" size={28} color={colors.blanco} />
                </Pressable>

                <Modal
                    visible={dropdownVisible}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setDropdownVisible(false)}
                >
                    <Pressable style={styles.modalOverlay} onPress={() => setDropdownVisible(false)}>
                        <View style={styles.dropdownContainer}>
                            {categories.map((cat) => (
                                <Pressable
                                    key={cat.id}
                                    onPress={() => {
                                        setDropdownVisible(false);
                                        navigation.navigate('Shop', {
                                            screen: 'ItemListCategory',
                                            params: { category: cat, q: '' },
                                        });
                                    }}
                                    style={styles.dropdownItem}
                                >
                                    <Text style={styles.menuText}>{cat.name}</Text>
                                </Pressable>
                            ))}
                        </View>
                    </Pressable>
                </Modal>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.text,
        paddingTop: 40,
        paddingBottom: 10
    },

    topRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 12
    },
    searchRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 12,
        marginTop: 10,
    },

    logo: {
        width: 100,
        height: 100,
        resizeMode: "contain"
    },

    searchContainer: {
        flex: 1,
        backgroundColor: colors.verde,
        borderRadius: 12,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        position: 'relative',
    },


    searchInput: {
        flex: 1,
        height: 40,
        color: colors.blanco,
        outlineWidth: 0,
        outlineStyle: "none"
    },

    actions: {
        flexDirection: "row",
        gap: 15
    },

    actionItem: {
        alignItems: "center"
    },

    actionText: {
        fontSize: 12,
        color: "white"
    },

    menuRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 12
    },

    menuButton: {
        padding: 8,
    },

    // styles for dropdown modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdownContainer: {
        backgroundColor: colors.text,
        borderRadius: 8,
        padding: 12,
        width: '80%',
    },
    dropdownItem: {
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#444',
    },

    menuText: {
        fontSize: 15,
        fontWeight: "600",
        color: colors.blanco
    }
});
