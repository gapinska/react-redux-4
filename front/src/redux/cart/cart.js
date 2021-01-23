export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

export const addToCart = (book) => (dispatch, getState) => {
	const cartItems = getState().cart.cartItems.slice()
	let alreadyInCart = false
	cartItems.forEach((item) => {
		if (item.id === book.id) {
			item.count++
			alreadyInCart = true
		}
	})

	if (!alreadyInCart) {
		cartItems.push({ ...book, count: 1 })
	}

	dispatch({
		type: ADD_TO_CART,
		payload: {
			cartItems
		}
	})
	localStorage.setItem('cartItems', JSON.stringify(cartItems))
}

export const removeFromCart = (book) => (dispatch, getState) => {
	const cartItems = getState().cart.cartItems.slice().filter((item) => item._id !== book._id)
	dispatch({
		type: REMOVE_FROM_CART,
		payload: {
			cartItems
		}
	})
	localStorage.setItem('cartItems', JSON.stringify(cartItems))
}
