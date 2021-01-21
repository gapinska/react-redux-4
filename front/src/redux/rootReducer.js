import { combineReducers } from 'redux'
import dataReducer from './server/data'
import cartReducer from './cart/cartReducer'
import paginationReducer from './pagination/paginationReducer'

const rootReducer = combineReducers({
	data: dataReducer,
	cart: cartReducer,
	currentPage: paginationReducer
})

export default rootReducer
