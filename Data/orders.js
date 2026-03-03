// Mock data 

import { cartItems } from "./cart";

export const orders = [
    {
        id: "o1",
        createdAt: Date.now() - 1000 * 60 * 60 * 24,
        items: cartItems,
    },
];
