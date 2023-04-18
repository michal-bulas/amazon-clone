import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		items: [],
	},
	reducers: {
		addToCart: (state, action) => {},
		removeFromCart: (state, action) => {},
	},
});

export const cartActions = cartSlice.actions;

export default cartSlice;
