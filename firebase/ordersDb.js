const FIREBASE_DB_URL = "https://pasion90-cursocoderapp-default-rtdb.firebaseio.com";

export const saveOrder = async (userId, order) => {
    const timestamp = Date.now();
    const orderData = {
        ...order,
        createdAt: timestamp,
        userId
    };
    
    const url = FIREBASE_DB_URL + "/orders/" + userId + ".json";
    console.log("Saving order to:", url);
    
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
    });
    
    const json = await response.json();
    return { ...orderData, id: json.name };
};

export const getOrders = async (userId) => {
    const url = FIREBASE_DB_URL + "/orders/" + userId + ".json";
    const response = await fetch(url);
    const json = await response.json();
    
    if (!json) return [];
    
    return Object.entries(json).map(([key, value]) => ({
        id: key,
        ...value
    })).sort((a, b) => b.createdAt - a.createdAt);
};

export const deleteOrder = async (userId, orderId) => {
    const url = FIREBASE_DB_URL + "/orders/" + userId + "/" + orderId + ".json";
    await fetch(url, {
        method: 'DELETE'
    });
};