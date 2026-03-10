import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api_key, base_auth_url } from "../firebase/auth";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: base_auth_url, }),
    endpoints: (builder) => ({

        login: builder.mutation({
            query: ({ email, password }) => ({
                url: `accounts:signInWithPassword?key=${api_key}`,
                method: "POST",
                body: {
                    email,
                    password,
                    returnSecureToken: true,
                }
            })
        }),

        register: builder.mutation({
            query: ({ email, password }) => ({
                url: `accounts:signUp?key=${api_key}`,
                method: "POST",
                body: {
                    email,
                    password,
                    returnSecureToken: true,
                }
            })
        })
    })
});

export const { useLoginMutation, useRegisterMutation } = authApi;