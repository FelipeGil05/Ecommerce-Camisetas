import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLogged: false,
    user: null,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLogged = true;
            state.user = action.payload; 
            state.error = null;
        },
        logout: (state) => {
            state.isLogged = false;
            state.user = null;
            state.error = null;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { login, logout, setError } = authSlice.actions;
export default authSlice.reducer;