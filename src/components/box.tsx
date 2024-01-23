import React from 'react'

import BuildingImage from '@/assets/building.svg'
import { cn } from '@/lib/utils'

interface BoxProps {
  children: React.ReactNode
  title: string
  description: string
  symbol: string
  className?: string
}

const Box: React.FC<BoxProps> = ({
  children,
  description,
  title,
  symbol,
  className,
}) => {
  return (
    <div className="flex h-full items-center justify-center lg:gap-12 xl:gap-36">
      <img
        className="hidden lg:block lg:max-w-lg xl:max-w-full"
        src={BuildingImage}
        alt="Imagem de um predio"
      />
      <div
        className={cn(
          'flex h-[433px] max-w-[380px] flex-col justify-center  rounded-[28px]  bg-white px-8 py-10 drop-shadow-shadow',
          className
        )}
      >
        <h1 className="text-4xl font-bold -tracking-wider text-blue-800">
          {title}
          <span className="text-orange-500">{symbol}</span>
        </h1>
        <p className="pt-4 leading-5 -tracking-wide text-gray-500">
          {description}
        </p>
        {children}
      </div>
    </div>
  )
}

export default Box
