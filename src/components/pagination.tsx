import React from 'react'

import { ArrowLeft, ArrowRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (pageNumber: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber)
    }
  }

  const renderPageNumbers = () => {
    const pageNumbers = Array.from(
      { length: totalPages },
      (_, index) => index + 1
    )

    const visiblePages = []
    const maxVisiblePages = 3

    if (totalPages <= maxVisiblePages) {
      visiblePages.push(...pageNumbers)
    } else {
      const ellipsis = <span key="ellipsis">...</span>

      if (currentPage <= maxVisiblePages) {
        visiblePages.push(
          ...pageNumbers.slice(0, maxVisiblePages),
          ellipsis,
          totalPages
        )
      } else if (currentPage >= totalPages - maxVisiblePages + 1) {
        visiblePages.push(
          1,
          ellipsis,
          ...pageNumbers.slice(totalPages - maxVisiblePages + 1)
        )
      } else {
        const start = currentPage - Math.floor((maxVisiblePages - 4) / 2)
        const end = currentPage + Math.ceil((maxVisiblePages - 4) / 2)
        visiblePages.push(
          1,
          ellipsis,
          ...pageNumbers.slice(start, end),
          ellipsis,
          totalPages
        )
      }
    }

    return (
      <>
        <button
          type="button"
          className="inline-flex items-center rounded-l-lg border border-gray-200 px-2 py-2 text-sm font-semibold"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ArrowLeft size={20} className="mr-2 text-blue-200" />
          <span className="text-sm font-medium text-blue-600">Anterior</span>
        </button>

        {visiblePages.map((pageNumber, index) => (
          <button
            key={index}
            type="button"
            className={`inline-flex items-center border border-gray-200 px-4 py-2 text-sm font-semibold hover:bg-gray-50 ${
              currentPage === pageNumber ? 'bg-gray-50 text-blue-600' : ''
            }`}
            onClick={() => handlePageChange(Number(pageNumber))}
          >
            {pageNumber}
          </button>
        ))}

        <button
          type="button"
          className="inline-flex items-center rounded-r-lg border border-gray-200 px-2 py-2 text-sm font-semibold"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <span className="mr-2 text-sm font-medium text-blue-600">
            Próxima
          </span>
          <ArrowRight size={20} />
        </button>
      </>
    )
  }

  return (
    <nav
      aria-label="Pagination"
      className="inline-flex -space-x-px rounded-lg bg-white p-4 text-blue-200 "
    >
      {renderPageNumbers()}
    </nav>
  )
}
