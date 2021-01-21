import { useDispatch, useSelector } from 'react-redux'
import { currentPageUpdate } from '../redux/pagination/pagination'
import _, { sortedIndex } from 'lodash'
import paginationReducer from '../redux/pagination/paginationReducer'

const Pagination = ({ paginate }) => {
	const dispatch = useDispatch()
	const data = useSelector((state) => state.data.data.metadata)
	console.log(data)
	const currentPage = data.page
	const recordsPerPage = data.records_per_page
	const totalRecords = data.total_records
	const pageAmount = Math.ceil(totalRecords / recordsPerPage)
	if (pageAmount === 1) return null
	const pages = _.range(1, pageAmount + 1)

	return (
		<nav>
			<div className="pagination">
				{pages.map((page) => (
					<div key={page} className={page === currentPage ? 'page-item active' : 'page-item'}>
						<button className="page-link" onClick={() => paginate(page)}>
							{page}
						</button>
					</div>
				))}
			</div>
		</nav>
	)
}

export default Pagination
