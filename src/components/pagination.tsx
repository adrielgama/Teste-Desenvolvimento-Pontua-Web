import React from 'react'

import { ArrowLeft, ArrowRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalItems: number
  itemsPerPage: number
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
    <div className="bottom-16 flex h-16 w-full justify-center bg-white px-8 py-3 lg:bottom-4">
      <div className="flex w-full items-center justify-center gap-2 rounded-lg border lg:w-1/3">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex cursor-pointer items-center gap-2 px-3 text-blue-500"
        >
          <ArrowLeft size={20} className="text-blue-200" />
          <span className="font-medium text-blue-600 hover:text-blue-500/80">
            Anterior
          </span>
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 font-medium text-blue-600 ${
              currentPage === index + 1 ? '' : 'text-blue-200'
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex cursor-pointer items-center gap-2 px-3 py-1 text-blue-500"
        >
          <span className="font-medium text-blue-600 hover:text-blue-500/80">
            Próximo
          </span>
          <ArrowRight size={20} className="text-blue-200" />
        </button>
      </div>
    </div>
  )
}
