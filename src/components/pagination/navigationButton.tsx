import React from 'react'

interface NavigationButtonProps {
  onClick: () => void
  disabled?: boolean
  children: React.ReactNode
  className?: string
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({
  onClick,
  disabled,
  children,
  className = '',
}) => {
  return (
    <button
      type="button"
      className={`inline-flex items-center border px-2 py-2 text-sm font-semibold ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
