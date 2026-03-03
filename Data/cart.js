// Mock data luego lo vamos a reemplazar por Redux/Firebase

import products from "./products2.json";

export const cartItems = [
    { ...products[0], quantity: 1 },
    { ...products[1], quantity: 2 },
];
