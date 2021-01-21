import axios from 'axios'
import { useSelector } from 'react-redux'
import { FETCH_DATA_FAILURE, FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS } from './dataTypes'

export const fetchDataRequest = () => {
	return {
		type: FETCH_DATA_REQUEST
	}
}

export const fetchDataSuccess = (data) => {
	return {
		type: FETCH_DATA_SUCCESS,
		payload: data
	}
}

export const fetchDataFailure = (error) => {
	return {
		type: FETCH_DATA_FAILURE,
		payload: error
	}
}

const initialState = {
	loading: false,
	data: {},
	error: ''
}

const dataReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_DATA_REQUEST:
			return {
				...state,
				loading: true
			}
		case FETCH_DATA_SUCCESS:
			return {
				...state,
				loading: false,
				data: action.payload,
				error: ''
			}
		case FETCH_DATA_FAILURE:
			return {
				...state,
				loading: false,
				data: {},
				error: action.payload
			}
		default:
			return state
	}
}

let url = 'http://localhost:3001/api/book?page='

export const fetchData = (pageNum = 1) => {
	return (dispatch) => {
		dispatch(fetchDataRequest)
		axios
			.get(url + pageNum)
			.then((response) => {
				const data = response.data
				dispatch(fetchDataSuccess(data))
			})
			.catch((error) => {
				const errorMsg = error.message
				dispatch(fetchDataFailure(errorMsg))
			})
	}
}

export default dataReducer
