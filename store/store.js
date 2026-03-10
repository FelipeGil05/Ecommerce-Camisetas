import { configureStore } from '@reduxjs/toolkit';
import { shopApi } from '../services/shopService';
import { authApi } from "../services/authService";
import authReducer from './features/authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [shopApi.reducerPath]: shopApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(shopApi.middleware, authApi.middleware)
});