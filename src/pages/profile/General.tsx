import ProfileBoxCharacter from '@/components/profile/profileBoxCharacter'
import { useCharacterContext } from '@/context/CharacterContext'

export const General = () => {
  const { selectedCharacter, defaultCharacter } = useCharacterContext()
  const characterToDisplay = selectedCharacter || defaultCharacter

  if (!characterToDisplay) {
    return null
  }

  const { name, description, thumbnail } = characterToDisplay

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
