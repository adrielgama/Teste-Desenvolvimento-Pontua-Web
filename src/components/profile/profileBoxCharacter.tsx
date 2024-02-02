import React from 'react'

import NotAvailableIMG from '@/assets/image-not-available.webp'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'

import { Skeleton } from '../ui/skeleton'

interface CharacterProps {
  name: string
  description: string
  image: string
}

const ProfileBoxCharacter: React.FC<CharacterProps> = ({
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
    <div className="mt-7 flex w-full flex-col gap-4 rounded-2xl bg-white px-8 py-10 shadow-profile-shadow lg:h-64 lg:flex-row lg:px-10 xl:h-56">
      <div className="flex items-center gap-7 lg:items-start">
        {isLoading ? (
          <Skeleton className="h-24 w-24 rounded-full" />
        ) : (
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={isNotImageAvailable ? NotAvailableIMG : image}
              alt={isNotImageAvailable ? 'Not Available' : `${name} thumbnail`}
            />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
        )}
        {isLoading ? (
          <div className="lg:hidden">
            <Skeleton className="mb-4 h-6 w-48" />
            <Skeleton className="mb-2 h-2 w-48" />
            <Skeleton className="mb-2 h-2 w-32" />
            <Skeleton className="mb-2 h-2 w-40" />
          </div>
        ) : (
          <h1 className="text-2xl font-bold text-blue-600 lg:hidden">{name}</h1>
        )}
      </div>
      <div className="flex w-full flex-col gap-4">
        {isLoading ? (
          <div className="hidden lg:block">
            <Skeleton className="mb-4 h-6 w-48" />
            <Skeleton className="mb-2 h-2 max-w-screen-lg" />
            <Skeleton className="mb-2 h-2 max-w-screen-md" />
            <Skeleton className="mb-2 h-2 max-w-screen-lg" />
            <Skeleton className="mb-2 h-2 max-w-screen-sm" />
            <Skeleton className="mb-2 h-2 max-w-screen-2xl" />
          </div>
        ) : (
          <>
            <h1 className="hidden text-2xl font-bold text-blue-600 lg:block">
              {name}
            </h1>
            <ScrollArea className="h-48 xl:h-full">
              <p
                className={`${description ? 'font-semibold' : 'font-normal italic text-gray-400/90'} leading-6 text-[rgb(113,113,113)]`}
              >
                {description || 'Character without description'}
              </p>
            </ScrollArea>
          </>
        )}
      </div>
    </div>
  )
}

export default ProfileBoxCharacter
