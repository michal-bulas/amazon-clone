import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductProps } from '@/types/ProductProps';

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
			const productIndex = state.items.findIndex(
				(item) => item.id === action.payload.id
			);

			if (productIndex !== -1) {
				state.items[productIndex].quantity += 1;
			} else {
				state.items = [...state.items, { ...action.payload, quantity: 1 }];
			}
		},

		decreaseItemQuantity: (state: CartState, action: PayloadAction<number>) => {
			const productIndex = state.items.findIndex(
				(item) => item.id === action.payload
			);

			if (productIndex !== -1) {
				if (state.items[productIndex].quantity > 1) {
					state.items[productIndex].quantity -= 1;
				} else {
					state.items = state.items.filter(
						(item) => item.id !== action.payload
					);
				}
			}
		},

		removeFromCart: (state: CartState, action: PayloadAction<number>) => {
			state.items = state.items.filter((item) => item.id !== action.payload);
		},
	},
});

export const cartActions = cartSlice.actions;

export const selectItems = (state: { cart: CartState }) => state.cart.items;

export const selectCartQuantity = (state: { cart: CartState }) =>
	state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartTotal = (state: { cart: CartState }) =>
	state.cart.items.reduce(
		(total, item) => total + item.quantity * item.price,
		0
	);

export default cartSlice;
