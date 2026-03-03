import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Order from "../Screens/Order";

const Stack = createNativeStackNavigator();

export default function OrderStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Orders" component={Order} options={{ title: "Orders" }} />
        </Stack.Navigator>
    );
}
