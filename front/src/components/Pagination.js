import { useSelector } from 'react-redux'
import _ from 'lodash'

const Pagination = ({ paginate }) => {
	const data = useSelector((state) => state.data.data.metadata)
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
