import React, { useState } from 'react'
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom'
import CartHook from './CartHook'
import Books from './Books'
import { useSelector } from 'react-redux'

const Header = () => {
	const cartItemsNum = useSelector((state) =>
		state.cart.cartItems.reduce((acc, item) => {
			return acc + item.count
		}, 0)
	)

	return (
		<div>
			<Router>
				<div className="main-content">
					<div className="menu">
						<NavLink to="/" exact>
							<img
								className="logo"
								src={process.env.PUBLIC_URL + 'book-shop-logo.png'}
								alt="book shop logo"
							/>
						</NavLink>

						<div className="nav-item nav-item-cart">
							<NavLink to="/cart">
								<img
									className="cart-img"
									src={process.env.PUBLIC_URL + 'cart.png'}
									alt="book shop logo"
								/>
								<div className="cart-items-num">{cartItemsNum}</div>
								<div>Cart</div>
							</NavLink>
						</div>
					</div>
					<div>
						<Switch>
							<Route path="/" exact component={Books} />
							<Route path="/cart" exact component={CartHook} />
						</Switch>
					</div>
				</div>
			</Router>
		</div>
	)
}

export default Header
