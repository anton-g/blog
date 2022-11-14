const eggSeedKey = 'es'

type EggSeed = {
  a?: number
  b?: number
  c?: number
}

export const updateEggSeed = (update: EggSeed) => {
  const existingSeed = getEggSeed()

  const newSeed: EggSeed = {
    ...existingSeed,
    ...update,
  }

  localStorage.setItem(eggSeedKey, JSON.stringify(newSeed))
}

export const getEggSeed = (): EggSeed | null => {
  if (typeof localStorage === 'undefined') return null

  const existingItem = localStorage.getItem(eggSeedKey)
  const existingSeed = existingItem
    ? (JSON.parse(existingItem) as EggSeed)
    : null

  return existingSeed
}
