import { useEffect, useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { fetchData, fetchDataUpdate } from '../redux/server/data'
import formatCurrency from '../util'
import Fade from 'react-reveal/Fade'
import Modal from 'react-modal'
import Zoom from 'react-reveal/Zoom'
import { addToCart } from '../redux/cart/cart'
import Pagination from './Pagination'
import { currentPageUpdate } from '../redux/pagination/pagination'

const Books = ({ data }) => {
	const dispatch = useDispatch()
	const [ currentPage, setCurrentPage ] = useState(1)
	useEffect(
		() => {
			dispatch(fetchData(currentPage))
		},
		[ currentPage ]
	)

	// dispatch(fetchDataUpdate(num))

	const [ book, setBook ] = useState(null)

	let url = `?page=${currentPage}`

	const openModal = (book) => {
		setBook(book)
	}
	const closeModal = () => {
		setBook(null)
	}
	const paginate = (page) => {
		setCurrentPage(page)
	}
	return data.loading ? (
		<h2>Loading</h2>
	) : data.error ? (
		<h2>{data.error}</h2>
	) : (
		<div>
			<Fade bottom cascade>
				<ul className="shop-content">
					{data.data.data &&
						data.data.data.map((book) => (
							<li key={book.id}>
								<div className="book">
									<a href={'#' + book.id} onClick={() => openModal(book)}>
										<img className="product-photo" src={book.cover_url} alt={book.title} />
										<p className="book-title">{book.title}</p>
									</a>
									<div className="book-price">
										<div className="price-value">{formatCurrency(book.price)}</div>
										<button className="cart-btn" onClick={() => dispatch(addToCart(book))}>
											Add to Cart
										</button>
										{/* <button onClick={() => this.props.addToCart(product)} className="button primary">
									Add To Cart
								</button> */}
									</div>
								</div>
							</li>
						))}
					{/* <div>{data.data.data && console.log(data.data.data)}</div> */}
				</ul>
			</Fade>
			{data.data.metadata && <Pagination paginate={paginate} />}
			{book && (
				<Modal isOpen={true} onRequestClose={closeModal}>
					<Zoom>
						<button className="close-modal" onClick={closeModal}>
							x
						</button>
						<div className="product-details">
							<img src={book.cover_url} alt={book.title} />
							<div className="product-details-description">
								<p>
									<strong>{book.title}</strong>
								</p>
								<p>Number of pages: {book.pages}</p>
								<div className="product-price">
									<div className="price-value">Price: {formatCurrency(book.price)}</div>
									<button
										className="button primary"
										onClick={() => {
											// this.props.addToCart(product)
											closeModal()
										}}
									>
										Add To Cart
									</button>
								</div>
							</div>
						</div>
					</Zoom>
				</Modal>
			)}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		data: state.data
	}
}

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		fetchData: () => dispatch(fetchData())
// 	}
// }

export default connect(mapStateToProps)(Books)
