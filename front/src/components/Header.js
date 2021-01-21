import React, { useState } from 'react'
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom'
import Cart from './Cart'
import Books from './Books'

const Header = () => {
	return (
		<div>
			<Router>
				<div className="main-content">
					<div className="menu-wrapper">
						<div className="menu">
							<nav className="">
								<div className="logo">
									<div>Logo</div>
								</div>
								<div className="text-logo">TARTAK LORKI</div>
							</nav>
							<div className="navbar-contact">
								<span className="brand-name">TARTAK LORKI</span>
								<span className="contact">519 591 509</span>
							</div>
						</div>
					</div>
					<div className="">
						<ul className="">
							<li className="list-item">
								<NavLink to="/" exact>
									Home
								</NavLink>
							</li>
							<li className="list-item">
								<NavLink to="/cart">Cart</NavLink>
							</li>
						</ul>
					</div>
					<div>
						<Switch>
							<Route path="/" exact component={Books} />
							<Route path="/cart" exact component={Cart} />
							{/* <Route path="/o-nas" component={AboutUs} />
							<Route path="/produkty" component={Offer} />
							<Route path="/kontakt" component={Contact} /> */}
						</Switch>
					</div>
				</div>
				<div className="footer">
					<div className="menu">
						<ul className="info-container-1">
							<li className="list-item">
								<NavLink to="/">Home</NavLink>
							</li>
							<li className="list-item">
								<NavLink to="/cart">Cart</NavLink>
							</li>
						</ul>
					</div>
					<header className="brand-name">TARTAK LORKI</header>
				</div>
			</Router>
		</div>
	)
}

export default Header
