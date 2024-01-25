import React from 'react'

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
import { useAgentContext } from '@/context/AgentContext'
import { cn } from '@/lib/utils'

const characters = [
  {
    value: 'Captain America',
    label: 'Captain America',
    img: 'https://i.pinimg.com/474x/7c/c0/f0/7cc0f071eab67e27f5bb5d8820f3db5d.jpg',
  },
  {
    value: 'Cyclops',
    label: 'Cyclops',
    img: 'https://i.pinimg.com/750x/2f/c4/e0/2fc4e05a158d3a700ad7363bae720f17.jpg',
  },
  {
    value: 'Daredevil',
    label: 'Daredevil',
    img: 'https://i.pinimg.com/564x/e3/a3/25/e3a325954bf3ec071aca9d72b75cf35b.jpg',
  },
  {
    value: 'Hulk',
    label: 'Hulk',
    img: 'https://i.pinimg.com/originals/ad/71/e2/ad71e2d708a05de9773778b088d6ccff.jpg',
  },
  {
    value: 'Iron Men',
    label: 'Iron Men',
    img: 'https://cdn.openart.ai/stable_diffusion/872b4795cdc6c81e042cb9494c5c7a499c9ec899_2000x2000.webp',
  },
  {
    value: 'Spider Man',
    label: 'Spider Man',
    img: 'https://i.pinimg.com/originals/b3/27/e3/b327e3fee5fbfe1612af7c8629a11aaf.jpg',
  },
  {
    value: 'Thor',
    label: 'Thor',
    img: 'https://i.pinimg.com/474x/6e/b6/cd/6eb6cdec793665a8e2a07a99b37ecc28.jpg',
  },
  {
    value: 'Wolverine',
    label: 'Wolverine',
    img: 'https://i.pinimg.com/736x/3f/9f/7b/3f9f7b5389527566fac4b35dacd85d3e.jpg',
  },
]

function CharacterPicker() {
  const navigate = useNavigate()
  const { selectedAgent, selectAgent } = useAgentContext()
  const [open, setOpen] = React.useState(false)
  const char = characters.find(
    (character) => character.value === selectedAgent?.value
  )

  React.useEffect(() => {
    console.log(selectedAgent)
  }, [selectedAgent])

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
              {selectedAgent ? (
                <div className="flex items-center">
                  <Avatar className="mr-2 h-6 w-6">
                    <AvatarImage
                      src={char?.img}
                      alt={`Character: ${char?.label}`}
                    />
                  </Avatar>
                  <p className="font-medium text-gray-900">
                    {selectedAgent.value}
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
                {characters.map((character) => {
                  const [firstName, secondName] = character.label.split(' ')
                  const fallbackText =
                    secondName === undefined
                      ? character.label.substring(0, 2)
                      : `${firstName.substring(0, 1)}${secondName.substring(0, 1)}`

                  return (
                    <CommandItem
                      key={character.value}
                      value={character.value}
                      onSelect={() => {
                        selectAgent(character)
                        setOpen(false)
                      }}
                      className="flow-row flex w-full justify-between"
                    >
                      <div className="flex flex-1">
                        <Avatar className="mr-2 h-6 w-6">
                          <AvatarImage
                            src={character.img}
                            alt={`Character: ${character.label}`}
                          />
                          <AvatarFallback>{fallbackText}</AvatarFallback>
                        </Avatar>
                        <p className="font-medium text-gray-900">
                          {character.label}
                        </p>
                      </div>
                      <Check
                        className={cn(
                          'mr-2 h-5 w-5',
                          selectedAgent?.value === character.value
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <Button
          type="submit"
          className="mt-2 w-full gap-2 rounded-[10px] bg-blue-800 py-7 text-2xl font-bold text-white disabled:bg-gray-500"
          onClick={() => navigate('/home')}
        >
          Entrar
        </Button>
      </div>
    </Box>
  )
}

export default CharacterPicker
