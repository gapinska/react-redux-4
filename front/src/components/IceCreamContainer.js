import { useSelector, useDispatch } from 'react-redux'
import { buyIceCream } from '../redux/iceCream/iceCream'

const IceCreamContainer = () => {
	const numOfIceCreams = useSelector((state) => state.iceCream.numOfIceCreams)
	const dispatch = useDispatch()

	return (
		<div>
			<h2>Num of iceCreams: {numOfIceCreams}</h2>
			<button onClick={() => dispatch(buyIceCream())}>Buy iceCream</button>
		</div>
	)
}

export default IceCreamContainer
