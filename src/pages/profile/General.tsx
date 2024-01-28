import ProfileBoxCharacter from '@/components/profile/profileBoxCharacter'
import { PorfileNavbar } from '@/components/profile/profileNavbar'
import { useCharacterContext } from '@/context/CharacterContext'

export const General = () => {
  const { selectedCharacter } = useCharacterContext()

  if (!selectedCharacter) {
    return null
  }

  const { name, description, thumbnail } = selectedCharacter

  return (
    <div>
      <PorfileNavbar />
      <ProfileBoxCharacter
        name={name}
        description={description}
        image={`${thumbnail.path}.${thumbnail.extension}`}
      />
    </div>
  )
}
