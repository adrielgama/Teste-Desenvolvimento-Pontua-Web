import React from 'react'

interface ProfileGenericListProps {
  list: string[]
  maxItems?: number
}

const ProfileGenericList: React.FC<ProfileGenericListProps> = ({
  list,
  maxItems = 7,
}) => {
  const numberOfItemsToShow = Math.min(
    Math.floor(Math.random() * maxItems) + 1,
    list.length
  )
  const getRandomItemList = () => list[Math.floor(Math.random() * list.length)]
  const displayedItemList = Array.from(
    { length: numberOfItemsToShow },
    getRandomItemList
  )

  return (
    <div>
      <ul className="list-disc p-4">
        {displayedItemList.map((value, index) => (
          <li
            className="mt-1 font-body font-semibold text-[rgb(102,112,133)]"
            key={index}
          >
            {value}
          </li>
        ))}
      </ul>

      <p className="mt-12 text-xs italic text-gray-400">
        The contents of this list are mock data generated randomly.
      </p>
    </div>
  )
}

export default ProfileGenericList
