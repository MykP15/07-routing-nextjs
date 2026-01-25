import styles from "./Pagination.module.css"
import ReactPaginate from "react-paginate"

interface PaginationProps {
    totalPages: number
    page: number
    onPageChange: (page: number) => void
}

function Pagination({ totalPages, page, onPageChange }: PaginationProps) {



    return (
        <ReactPaginate
        pageCount={totalPages} 
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        onPageChange={({ selected }) => onPageChange(selected + 1)}
        forcePage={page - 1}
        containerClassName={styles.pagination}
        activeClassName={styles.active}
        nextLabel="→"
        previousLabel="←"
      />
    )
}

export default Pagination