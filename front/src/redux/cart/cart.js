export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const REMOVE_ALL_ITEMS = 'REMOVE_ALL_ITEMS'

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
	const cartItems = getState().cart.cartItems.slice().filter((item) => item.id !== book.id)
	dispatch({
		type: REMOVE_FROM_CART,
		payload: {
			cartItems
		}
	})
	localStorage.setItem('cartItems', JSON.stringify(cartItems))
}

export const removeAllItems = (dispatch) => {
	const cartItems = []
	dispatch({
		type: REMOVE_ALL_ITEMS,
		payload: {
			cartItems
		}
	})
	localStorage.setItem('cartItems', JSON.stringify(cartItems))
}
