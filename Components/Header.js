import { View, Text, StyleSheet, Pressable, TextInput, Image, Modal, Animated } from "react-native";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from "../Global/colors";
import { useState, useRef } from "react";
import { useGetCategoriesQuery } from "../services/shopService";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/features/authSlice";

export default function Header({ navigation }) {
    const [query, setQuery] = useState("");
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [accountMenuVisible, setAccountMenuVisible] = useState(false);
    const isLogged = useSelector(state => state.auth.isLogged);
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const [categoriesMenuVisible, setCategoriesMenuVisible] = useState(false);
    const categoriesSlideAnim = useRef(new Animated.Value(-300)).current;

    const navToTab = (tabName, params) => {
        navigation.navigate('Main', {
            screen: tabName,
            params,
        });
    };

    const search = () => {
        navToTab('Shop', { screen: 'ItemListCategory', params: { q: query, category: null } });
        setQuery('');
    };

    const clearSearch = () => {
        navToTab('Shop', { screen: 'ItemListCategory', params: { q: '', category: null } });
        setQuery('');
    };

    const goHome = () => navToTab('Shop', { screen: 'Home' });
    const goProducts = () => navToTab('Shop', { screen: 'ItemListCategory', params: { q: '', category: null } });

    const { data: categories = [] } = useGetCategoriesQuery();

    const slideAnim = useRef(new Animated.Value(300)).current;

    const closeMenu = () => {
        Animated.timing(slideAnim, {
            toValue: 300,
            duration: 250,
            useNativeDriver: true
        }).start(() => setAccountMenuVisible(false));
    };

    const closeCategoriesMenu = () => {
        Animated.timing(categoriesSlideAnim, {
            toValue: -300,
            duration: 250,
            useNativeDriver: true
        }).start(() => setCategoriesMenuVisible(false));
    };

    const handleLogout = () => {
        dispatch(logout());
        closeMenu();
    };

    return (
        <View style={styles.container}>

            <View style={styles.topRow}>

                <Pressable onPress={goHome}>
                    <Image
                        source={require("../assets/images/logoPasion90_transparent.png")}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </Pressable>

                <View style={styles.actions}>
                    <Pressable
                        style={styles.actionItem}
                        onPress={() => {
                            setAccountMenuVisible(true)
                            Animated.spring(slideAnim, {
                                toValue: 0,
                                useNativeDriver: true,
                                friction: 8
                            }).start();
                        }}
                    >
                        <Ionicons name="person-outline" size={24} color={colors.blanco} />
                        <Text style={styles.actionText}>Mi cuenta</Text>
                    </Pressable>

                    <Pressable style={styles.actionItem} onPress={() => navToTab('Cart')}>
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
                <Pressable
                    style={styles.menuButton}
                    onPress={() => {
                        setCategoriesMenuVisible(true);
                        Animated.spring(categoriesSlideAnim, {
                            toValue: 0,
                            useNativeDriver: true,
                            friction: 8
                        }).start();
                    }}
                >
                    <Ionicons name="menu" size={28} color={colors.blanco} />
                </Pressable>

                <Modal
                    visible={categoriesMenuVisible}
                    transparent
                    animationType="none"
                    onRequestClose={closeCategoriesMenu}
                >
                    <View style={styles.sideMenuOverlay}>
                        <Animated.View
                            style={[
                                styles.categoriesMenuContainer,
                                { transform: [{ translateX: categoriesSlideAnim }] }
                            ]}
                        >
                            <Text style={styles.sideMenuTitle}>Categorías</Text>
                            {categories.map((cat) => (
                                <Pressable
                                    key={cat.id}
                                    style={styles.categoryItem}
                                    onPress={() => {
                                        closeCategoriesMenu();
                                        navToTab('Shop', {
                                            screen: 'ItemListCategory',
                                            params: { category: cat, q: '' },
                                        });
                                    }}
                                >
                                    <Ionicons name="football-outline" size={20} color={colors.amarillo} />
                                    <Text style={styles.menuText}>{cat.name}</Text>
                                    <Ionicons name="chevron-forward" size={18} color={colors.blanco} />
                                </Pressable>
                            ))}
                        </Animated.View>
                        
                        <Pressable
                            style={styles.sideMenuBackground}
                            onPress={closeCategoriesMenu}
                        />
                    </View>
                </Modal>
            </View>

            <Modal
                visible={accountMenuVisible}
                transparent
                animationType="none"
                onRequestClose={() => setAccountMenuVisible(false)}
            >

                <View style={styles.sideMenuOverlay}>

                    <Pressable
                        style={styles.sideMenuBackground}
                        onPress={closeMenu}
                    />

                    <Animated.View
                        style={[
                            styles.sideMenuContainer,
                            { transform: [{ translateX: slideAnim }] }
                        ]}
                    >

                        {!isLogged ? (

                            <>
                                <View>
                                    <Text style={styles.sideMenuTitle}>Mi cuenta</Text>

                                    <Pressable style={styles.sideMenuButton} onPress={() => { closeMenu(); navigation.navigate("Login") }}>
                                        <Text style={styles.sideMenuButtonText}>Iniciar sesión</Text>
                                    </Pressable>

                                    <Pressable style={styles.sideMenuButton} onPress={() => { closeMenu(); navigation.navigate("Register") }}>
                                        <Text style={styles.sideMenuButtonText}>Registrarse</Text>
                                    </Pressable>
                                </View>
                            </>

                        ) : (

                            <>
                                <View>
                                    <Text style={styles.sideMenuTitle}>Mi cuenta</Text>

                                    <View style={styles.userInfo}>
                                        <Ionicons name="person-circle-outline" size={60} color={colors.amarillo} />
                                        <Text style={styles.userEmail}>{user?.email}</Text>
                                    </View>

                                    <Pressable style={styles.sideMenuButton} onPress={() => { closeMenu(); navigation.navigate("Profile") }}>
                                        <Text style={styles.sideMenuButtonText}>Mi perfil</Text>
                                    </Pressable>

                                    <Pressable style={styles.sideMenuButton} onPress={() => { closeMenu(); navigation.navigate("Orders"); }}>
                                        <Text style={styles.sideMenuButtonText}>Mis pedidos</Text>
                                    </Pressable>
                                </View>

                                <Pressable style={styles.sideMenuButtonLogout} onPress={handleLogout}>
                                    <Text style={styles.sideMenuButtonText}>Cerrar sesión</Text>
                                </Pressable>
                            </>

                        )}
                    </Animated.View>
                </View>
            </Modal >

        </View >
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
        justifyContent: "left",
        marginTop: 12,
        paddingHorizontal: 12
    },
    menuButton: {
        padding: 8,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdownContainer: {
        backgroundColor: colors.text,
        borderRadius: 14,
        padding: 16,
        width: '85%',
        shadowColor: colors.text,
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10
    },
    dropdownItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#444',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        borderRadius: 8,
        marginBottom: 6
    },
    menuText: {
        fontSize: 15,
        fontWeight: "600",
        color: colors.blanco
    },
    sideMenuOverlay: {
        flex: 1,
        flexDirection: "row",
    },
    sideMenuBackground: {
        flex: 1,
    },
    sideMenuContainer: {
        width: "50%",
        height: "100%",
        backgroundColor: colors.negro,
        padding: 20,
        justifyContent: "space-between",
    },
    sideMenuTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.verde,
        marginBottom: 20,
        textAlign: "center",
        marginTop: 30
    },
    sideMenuButton: {
        backgroundColor: colors.amarillo,
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: "center"
    },
    sideMenuButtonLogout: {
        backgroundColor: colors.amarillo,
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: "center"
    },
    sideMenuButtonText: {
        color: colors.text,
        fontWeight: "600"
    },
    userInfo: {
        alignItems: "center",
        marginBottom: 20
    },
    userEmail: {
        color: colors.verde,
        fontSize: 14,
        marginTop: 5
    },
    dropdownTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.verde,
        marginBottom: 15,
        textAlign: "center"
    },
    dropdownItemPressed: {
        backgroundColor: colors.negro
    },
    categoriesMenuContainer: {
        width: "70%",
        height: "100%",
        backgroundColor: colors.negro,
        padding: 20
    },
    categoryItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: colors.verde
    },
});
