import { ADD_TO_CART, REMOVE_FROM_CART, REMOVE_ALL_ITEMS } from './cart'

export const cartReducer = (state = { cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]') }, action) => {
	switch (action.type) {
		case ADD_TO_CART:
			return { cartItems: action.payload.cartItems }
		case REMOVE_FROM_CART:
			return { cartItems: action.payload.cartItems }
		case REMOVE_ALL_ITEMS:
			return { cartItems: action.payload.cartItems }
		default:
			return state
	}
}

export default cartReducer
