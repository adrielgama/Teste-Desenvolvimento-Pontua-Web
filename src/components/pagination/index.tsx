import React from 'react'

import { RenderPageNumbers } from './paginationNumbers'

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

  return (
    <nav
      aria-label="Pagination"
      className="inline-flex -space-x-px rounded-lg bg-white p-4 text-blue-200 "
    >
      <RenderPageNumbers
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </nav>
  )
}
