import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import shopReducer from './features/shop/shopSlice';
import { shopApi } from '../services/shopService';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        shop: shopReducer,

        //RTK Query
        [  shopApi.reducerPath]: shopApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(shopApi.middleware)
});