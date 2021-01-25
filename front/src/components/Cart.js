import React, { useState } from 'react'
import formatCurrency from '../util'
import Fade from 'react-reveal/Fade'
import { removeFromCart, removeAllItems } from '../redux/cart/cart'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import Modal from 'react-modal'
import Zoom from 'react-reveal/Zoom'
import axios from 'axios'

const Cart = () => {
	const cartItems = useSelector((state) => state.cart.cartItems)
	const dispatch = useDispatch()
	const { handleSubmit, register, errors } = useForm()
	const [ showCheckout, setShowCheckout ] = useState(false)
	const order = []
	cartItems.forEach((item) => order.push({ id: item.id, quantity: item.count }))

	const closeModal = () => {
		setShowCheckout(null)
	}

	const onSubmit = (dataDetails) => {
		const postItems = {
			order: [ ...order ],
			first_name: dataDetails.firstName,
			last_name: dataDetails.lastName,
			city: dataDetails.city,
			zip_code: dataDetails.zipCode
		}

		axios
			.post('http://localhost:3001/api/order', postItems)
			.then((response) => {
				console.log(response)
			})
			.catch((error) => {
				console.log(error)
			})

		closeModal()
		dispatch(removeAllItems)
	}

	return (
		<div>
			{cartItems.length === 0 ? (
				<div className="empty-cart">Your cart is empty</div>
			) : (
				<div className="content">
					<div className="cart-content">
						<div className="cart">
							<Fade left cascade>
								<ul className="cart-items">
									{cartItems.map((item) => (
										<li className="cart-item" key={item.id}>
											<div>
												<img
													className="cart-product-photo"
													src={item.cover_url}
													alt={item.title}
												/>
											</div>
											<div>
												<div className="book-title">{item.title}</div>
												<p className="num-of-pages">Number of pages: {item.pages}</p>
												<div className="price-value">
													{formatCurrency(item.price)} x {item.count}{' '}
													<button
														className="cart-btn"
														onClick={() => dispatch(removeFromCart(item))}
													>
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
										<div className="price-details">
											TOTAL:{' '}
											<span>
												{formatCurrency(cartItems.reduce((a, c) => a + c.price * c.count, 0))}
											</span>
										</div>
										<div className="btn-container">
											<button className="cart-btn proceed" onClick={() => setShowCheckout(true)}>
												Proceed
											</button>
										</div>
									</div>
								</div>
								{showCheckout && (
									<Modal
										isOpen={true}
										onRequestClose={closeModal}
										ariaHideApp={false}
										contentLabel="Selected Option"
									>
										<Zoom>
											<div className="close-modal-content">
												<button className="close-modal" onClick={closeModal}>
													x
												</button>
											</div>

											<div className="modal-content">
												<form onSubmit={handleSubmit(onSubmit)}>
													<h3 className="form-title">Sign Up</h3>
													<label className="label-form">First Name</label>
													<input
														className="input-form"
														name="firstName"
														ref={register({ required: true, minLength: 2 })}
														placeholder="First Name"
													/>
													{errors.firstName &&
													errors.firstName.type === 'required' && <p>This is required</p>}
													{errors.firstName &&
													errors.firstName.type === 'minLength' && (
														<p className="error">This field requires min length of 2</p>
													)}

													<label className="label-form">Last Name</label>
													<input
														className="input-form"
														name="lastName"
														ref={register({ required: true, minLength: 2 })}
														placeholder="Last Name"
													/>
													{errors.lastName &&
													errors.lastName.type === 'required' && <p>This is required</p>}
													{errors.lastName &&
													errors.lastName.type === 'minLength' && (
														<p className="error">This field requires min length of 2</p>
													)}

													<label className="label-form">City</label>
													<input
														className="input-form"
														name="city"
														ref={register({ required: true })}
														placeholder="City"
													/>
													{errors.city &&
													errors.city.type === 'required' && (
														<p className="error">This is required</p>
													)}

													<label className="label-form">Zip code</label>
													<input
														className="input-form"
														name="zipCode"
														ref={register({
															required: true
														})}
														placeholder="Zip code"
													/>
													{errors.zipCode &&
													errors.zipCode.type === 'required' && <p>This is required</p>}

													<button type="submit" className="cart-btn form-cart-btn">
														Submit
													</button>
												</form>
											</div>
										</Zoom>
									</Modal>
								)}
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default Cart
