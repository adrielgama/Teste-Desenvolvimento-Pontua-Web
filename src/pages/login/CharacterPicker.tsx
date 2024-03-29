import React from 'react'

import { useQuery } from '@tanstack/react-query'
import { Check, ChevronDown, ChevronUp, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import Box from '@/components/box'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useCharacterContext } from '@/context/CharacterContext'
import { cn } from '@/lib/utils'
import { ICharacter } from '@/types/character'

function CharacterPicker() {
  const navigate = useNavigate()
  const { selectedCharacter, selectCharacter, getCharacters } =
    useCharacterContext()
  const [open, setOpen] = React.useState(false)

  const { data: charactersData } = useQuery({
    queryKey: ['characters'],
    queryFn: () => getCharacters('', 1, 8),
    retry: 1,
    staleTime: 60 * 60 * 1000,
  })

  const handleCharacterSelection = (characterValue: ICharacter) => {
    selectCharacter(characterValue, characterValue.id)
    localStorage.setItem('selectedCharacter', JSON.stringify(selectedCharacter))
    setOpen(false)
  }

  return (
    <Box
      title="Selecione o seu agente mais legal"
      symbol="."
      description="Tenha a visão completa do seu agente."
      className="justify-start gap-4"
    >
      <div className="mt-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between rounded-lg"
            >
              {selectedCharacter ? (
                <div className="flex items-center">
                  <Avatar className="mr-2 h-6 w-6">
                    <AvatarImage
                      src={`${selectedCharacter.thumbnail.path}.${selectedCharacter.thumbnail.extension}`}
                      alt={`Character: ${selectedCharacter.name}`}
                    />
                  </Avatar>
                  <p className="font-medium text-gray-900">
                    {selectedCharacter.name}
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 text-gray-500">
                  <User size={20} />
                  <p className="font-body font-normal">Selecione um agente</p>
                </div>
              )}
              {open ? (
                <ChevronUp
                  size={20}
                  className="ml-2 h-4 w-4 shrink-0 text-gray-500 opacity-50"
                />
              ) : (
                <ChevronDown
                  size={20}
                  className="ml-2 h-4 w-4 shrink-0 text-gray-500 opacity-50"
                />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[318px] p-0">
            <Command>
              <CommandEmpty>No character found.</CommandEmpty>
              <CommandGroup>
                {charactersData?.data?.map((character) => (
                  <CommandItem
                    key={character.id}
                    value={character.name}
                    onSelect={() => handleCharacterSelection(character)}
                    className="flow-row flex w-full cursor-pointer justify-between"
                  >
                    <div className="flex flex-1">
                      <Avatar className="mr-2 h-6 w-6">
                        <AvatarImage
                          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                          alt={`Character: ${character.name}`}
                        />
                        <AvatarFallback>AG</AvatarFallback>
                      </Avatar>
                      <p className="font-medium text-gray-900">
                        {character.name}
                      </p>
                    </div>
                    <Check
                      className={cn(
                        'mr-2 h-5 w-5',
                        selectedCharacter?.name === character.name
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <Button
          type="submit"
          className="mt-2 w-full gap-2 rounded-[10px] bg-blue-800 py-7 text-2xl font-bold text-white disabled:bg-gray-500"
          onClick={() => navigate(`/profile/${selectedCharacter?.id}`)}
        >
          Entrar
        </Button>
      </div>
    </Box>
  )
}

export default CharacterPicker
