import React from 'react'
import { Provider } from 'react-redux'
import './App.css'
import Books from './components/Books'
import CartHook from './components/CartHook'
import Header from './components/Header'
import store from './redux/store'

function App() {
	return (
		<Provider store={store}>
			<div className="App">
				<Header />
				<CartHook />
			</div>
		</Provider>
	)
}

export default App
