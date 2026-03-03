import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CartScreen from "../Screens/Cart";

const Stack = createNativeStackNavigator();

export default function CartStack() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Cart" component={CartScreen} options={{ title: "Cart" }} />
        </Stack.Navigator>
    );
}
