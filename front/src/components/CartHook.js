import React, { useState } from 'react'
import formatCurrency from '../util'
import Fade from 'react-reveal/Fade'
import { connect } from 'react-redux'
import { removeFromCart } from '../redux/cart/cart'
import { appendErrors, useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'

const CartHook = () => {
	const cartItems = useSelector((state) => state.cart.cartItems)
	const dispatch = useDispatch()
	const { handleSubmit, register, errors } = useForm()
	const [ showCheckout, setShowCheckout ] = useState(false)

	const onSubmit = (values) => {
		console.log(values)
	}

	return (
		<div>
			{cartItems.length === 0 ? (
				<div className="cart cart-header">Cart is empty</div>
			) : (
				<div className="cart cart-header">You have {cartItems.length} in the cart </div>
			)}
			<div>
				<div className="cart">
					<Fade left cascade>
						<ul className="cart-items">
							{cartItems.map((item) => (
								<li classNamer="cartitem" key={item._id}>
									<div>
										<img className="cart-product-photo" src={item.cover_url} alt={item.title} />
									</div>
									<div>
										<div className="book-title">{item.title}</div>
										<p className="num-of-pages">Number of pages: {item.pages}</p>
										<div className="price-value">
											{formatCurrency(item.price * item.count)} x {item.count}{' '}
											<button className="cart-btn" onClick={() => dispatch(removeFromCart(item))}>
												Remove
											</button>
										</div>
									</div>
								</li>
							))}
						</ul>
					</Fade>
				</div>
				{cartItems.length !== 0 && (
					<div>
						<div className="cart">
							<div className="total">
								<div>Total: {formatCurrency(cartItems.reduce((a, c) => a + c.price * c.count, 0))}</div>
								<button onClick={() => setShowCheckout(true)} className="button primary">
									Proceed
								</button>
							</div>
						</div>
						{showCheckout && (
							<Fade right cascade>
								<div className="cart">
									<form onSubmit={handleSubmit(onSubmit)}>
										<h1>Sign Up</h1>
										<label>First Name:</label>
										<input name="firstName" ref={register({ required: true, minLength: 2 })} />
										{errors.firstName &&
										errors.firstName.type === 'required' && <p>This is required</p>}
										{errors.firstName &&
										errors.firstName.type === 'minLength' && (
											<p className="error">This field requires min length of 2</p>
										)}

										<label>Last Name:</label>
										<input name="lastName" ref={register({ required: true, minLength: 2 })} />
										{errors.lastName &&
										errors.lastName.type === 'required' && <p>This is required</p>}
										{errors.lastName &&
										errors.lastName.type === 'minLength' && (
											<p className="error">This field requires min length of 2</p>
										)}

										<label>Gender</label>
										<select name="gender" ref={register({ required: true })}>
											<option>Select...</option>
											<option>Male</option>
											<option>Female</option>
										</select>
										{errors.gender &&
										errors.gender.type === 'required' && <p className="error">This is required</p>}

										<label>Username</label>
										<input name="username" ref={register({ required: true })} />
										{errors.username &&
										errors.username.type === 'required' && (
											<p className="error">This is required</p>
										)}

										<label>Email</label>
										<input
											name="email"
											ref={register({
												required: true,
												pattern: {
													value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
													message: 'Enter a valid e-mail address'
												}
											})}
										/>
										{errors.email && errors.email.type === 'required' && <p>This is required</p>}
										{errors.email &&
										errors.email.type === 'pattern' && (
											<p className="error">{errors.email.message}</p>
										)}

										<label>Additional message</label>
										<textarea name="additionalMessage" ref={register} />
										{errors.additionalMessage &&
										errors.additionalMessage.type === 'required' && (
											<p className="error">This is required</p>
										)}

										<input type="submit" ref={register} />
									</form>
								</div>
							</Fade>
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default CartHook
