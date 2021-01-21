import { CURRENT_PAGE_UPDATE } from './pagination'

const initialState = {
	currentPage: 1
}

const paginationReducer = (state = initialState, action) => {
	switch (action.type) {
		case CURRENT_PAGE_UPDATE:
			return {
				...state,
				currentPage: action.payload
			}
		default:
			return state
	}
}

export default paginationReducer
