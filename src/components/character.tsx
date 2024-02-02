import React from 'react'

import NotAvailableIMG from '@/assets/image-not-available.webp'

import { Skeleton } from './ui/skeleton'

interface CharacterProps {
  name: string
  description: string
  image: string
}

export const Character: React.FC<CharacterProps> = ({
  name,
  description,
  image,
}) => {
  const [isLoading, setIsLoading] = React.useState(true)
  const isNotImageAvailable =
    image ===
    'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'

  React.useEffect(() => {
    const imageElement = new Image()
    imageElement.src = image

    imageElement.onload = () => {
      setIsLoading(false)
    }
  }, [image])

  return (
    <div className="flex cursor-pointer flex-row gap-4 rounded-2xl bg-gray-100 p-4 font-navigation transition-all lg:opacity-80 lg:hover:opacity-100">
      {isLoading ? (
        <Skeleton className="mb-4 h-28 w-20 rounded-xl" />
      ) : (
        <img
          src={isNotImageAvailable ? NotAvailableIMG : image}
          alt={isNotImageAvailable ? 'Not Available' : `${name} thumbnail`}
          className={`h-32 w-20 rounded-xl bg-white ${
            isNotImageAvailable ? 'object-contain' : 'object-cover'
          }`}
        />
      )}
      <div className="flex h-full flex-col gap-2">
        {isLoading ? (
          <>
            <Skeleton className="mb-2 h-6 w-48" />
            <Skeleton className="h-3 w-64" />
            <Skeleton className="h-3 w-56" />
            <Skeleton className="h-3 w-52" />
            <Skeleton className="h-3 w-56" />
          </>
        ) : (
          <>
            <h1 className="font-bold" aria-label={name}>
              {name}
            </h1>
            <p
              className={`${description ? '' : 'italic text-gray-400'} line-clamp-4 text-xs`}
            >
              {description || 'Character without description'}
            </p>
          </>
        )}
      </div>
    </div>
  )
}
