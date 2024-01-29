import ProfileBoxCharacter from '@/components/profile/profileBoxCharacter'
import { useCharacterContext } from '@/context/CharacterContext'

export const General = () => {
  const { selectedCharacter } = useCharacterContext()

  if (!selectedCharacter) {
    return null
  }

  const { name, description, thumbnail } = selectedCharacter

  return (
    <div>
      <ProfileBoxCharacter
        name={name}
        description={description}
        image={`${thumbnail.path}.${thumbnail.extension}`}
      />
    </div>
  )
}
