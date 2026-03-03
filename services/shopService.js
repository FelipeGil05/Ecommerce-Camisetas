import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FIREBASE_DB_URL } from "../firebase/database";

//RTK Query es motor de data fetching
export const shopApi = createApi({
    reducerPath: "shopApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: FIREBASE_DB_URL 
    }),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => `categories.json`
        }),
        getProducts: builder.query({
            query: () => `products.json`
        }),
        getProductsByCategory: builder.query({
            query: () => `products.json`
        }),
    })
})

export const { useGetCategoriesQuery, useGetProductsQuery, useGetProductsByCategoryQuery } = shopApi;