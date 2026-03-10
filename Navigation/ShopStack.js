import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../Screens/Home";
import ItemListCategory from "../Screens/ItemListCategory";
import ItemDetail from "../Screens/ItemDetail";
import Account from "../Screens/Account";
import Contact from "../Screens/Contact";

const Stack = createNativeStackNavigator();

export default function ShopStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Home" component={Home} options={{ title: "Categories" }} />
            <Stack.Screen
                name="ItemListCategory"
                component={ItemListCategory}
                options={({ route }) => ({
                    title: route?.params?.category?.name ?? "Products",
                })}
            />
            <Stack.Screen name="ItemDetail" component={ItemDetail} options={{ title: "Detail" }} />
            <Stack.Screen name="Account" component={Account} options={{ title: "Mi cuenta" }} />
            <Stack.Screen name="Contact" component={Contact} options={{ title: "Contacto" }} />
        </Stack.Navigator>
    );
}
