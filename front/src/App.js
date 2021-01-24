import React from 'react'
import { Provider } from 'react-redux'
import './App.scss'
import Header from './components/Header'
import store from './redux/store'

function App() {
	return (
		<Provider store={store}>
			<div className="app">
				<Header />
			</div>
		</Provider>
	)
}

export default App
