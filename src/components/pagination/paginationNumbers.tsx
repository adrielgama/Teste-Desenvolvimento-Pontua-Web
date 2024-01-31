import { ArrowLeft, ArrowRight } from 'lucide-react'

import { NavigationButton } from './navigationButton'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (pageNumber: number) => void
}

export const RenderPageNumbers: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
  totalPages,
}) => {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  )

  const visiblePages = []
  const maxVisiblePages = 2

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
        ...pageNumbers.slice(totalPages - maxVisiblePages)
      )
    } else {
      const start = currentPage - Math.floor((maxVisiblePages - 2) / 2)
      const end = currentPage + Math.ceil((maxVisiblePages - 2) / 2)
      visiblePages.push(
        1,
        ellipsis,
        currentPage,
        ...pageNumbers.slice(start, end),
        ellipsis,
        totalPages
      )
    }
  }

  return (
    <>
      <NavigationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-l-lg border-r-0 border-gray-200"
      >
        <ArrowLeft className="mr-2 h-4 w-4 text-blue-200 lg:h-5 lg:w-5" />
        <span className="text-xs font-medium text-blue-600 lg:text-sm">
          Anterior
        </span>
      </NavigationButton>

      {visiblePages.map((pageNumber, index) => (
        <button
          key={index}
          type="button"
          className={`inline-flex items-center border border-gray-200 px-4 py-2 text-xs font-semibold hover:bg-gray-50 lg:text-sm ${
            currentPage === pageNumber ? 'bg-gray-50 text-blue-600' : ''
          }`}
          onClick={() => onPageChange(Number(pageNumber))}
        >
          {pageNumber}
        </button>
      ))}

      <NavigationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-r-lg border-l-0 border-gray-200"
      >
        <span className="text-xs font-medium text-blue-600 lg:text-sm">
          Próxima
        </span>
        <ArrowRight className="ml-2 h-4 w-4 lg:h-5 lg:w-5" />
      </NavigationButton>
    </>
  )
}
