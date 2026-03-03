import { createSlice } from '@reduxjs/toolkit';

const allProducts = require('../../../Data/products.json');
const allCategories = require('../../../Data/categories.json');   

const initialState = {  
    categories: allCategories,
    products: allProducts,
    selectedCategory: null,
    selectedProduct: null,
    productsFilteredByCategory: []
}

const counterSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setProduct: (state, action) => {
            state.selectedProduct = action.payload
        },
        setCategory: (state, action) => {
            state.selectedCategory = action.payload;
            state.products.filter((p) => p.categoryId === action.payload.id);
        }
    }
})

export const { setCategories, setProducts, setProduct, setCategory } = counterSlice.actions
export default counterSlice.reducer;