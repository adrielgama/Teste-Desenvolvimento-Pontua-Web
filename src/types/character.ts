interface Thumbnail {
  path: string
  extension: string
}

interface ICharacter {
  id: number
  name: string
  description: string
  thumbnail: Thumbnail
}

interface GetCharactersResponse {
  data: ICharacter[]
  totalItems: number
}

export type { ICharacter, GetCharactersResponse }
