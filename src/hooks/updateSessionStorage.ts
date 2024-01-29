export const updateSessionStorage = (
  currentCharacterId: string,
  storedCharacterId: string | null
) => {
  if (
    currentCharacterId &&
    storedCharacterId &&
    currentCharacterId !== storedCharacterId
  ) {
    sessionStorage.setItem('currentCharacterId', currentCharacterId)

    Object.keys(sessionStorage)
      .filter((key) => key.startsWith('page') && key.endsWith('List'))
      .forEach((key) => sessionStorage.removeItem(key))
  } else if (currentCharacterId && !storedCharacterId) {
    sessionStorage.setItem('currentCharacterId', currentCharacterId)
  }
}
