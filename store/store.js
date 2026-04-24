import { configureStore } from '@reduxjs/toolkit';
import { shopApi } from '../services/shopApi';
import { authApi } from "../services/authApi";
import authReducer from './features/authSlice';
import cartReducer from './cartSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [shopApi.reducerPath]: shopApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        cart: cartReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(shopApi.middleware, authApi.middleware)
});