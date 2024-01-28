import React from 'react'

import NotAvailableIMG from '@/assets/image-not-available.webp'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'

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
  const isNotImageAvailable =
    image ===
    'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'

  return (
    <div className="shadow-profile-shadow mt-7 flex w-full flex-col gap-4 rounded-2xl bg-white px-8 py-10 lg:h-64 lg:flex-row lg:px-10 xl:h-56">
      <div className="flex items-center gap-7 lg:items-start">
        <Avatar className="h-24 w-24">
          <AvatarImage
            src={isNotImageAvailable ? NotAvailableIMG : image}
            alt={isNotImageAvailable ? 'Not Available' : `${name} thumbnail`}
          />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold text-blue-600 lg:hidden">{name}</h1>
      </div>
      <div className="flex w-full flex-col gap-4">
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
      </div>
    </div>
  )
}

export default ProfileBoxCharacter
