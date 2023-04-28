import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductProps } from '@/types/ProductTypes';

interface CartState {
	items: ProductProps[];
}

const initialState: CartState = {
	items: [],
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state: CartState, action: PayloadAction<ProductProps>) => {
			state.items = [...state.items, action.payload];
		},
		removeFromCart: (state: CartState, action: PayloadAction<number>) => {
			state.items = state.items.filter((item) => item.id !== action.payload);
		},
	},
});

export const cartActions = cartSlice.actions;

export const selectItems = (state: { cart: CartState }) => state.cart.items;

export default cartSlice;
