const eggSeedKey = 'es'
const achievementsKey = 'ach'

type EggSeed = {
  a?: number
  b?: number
  c?: number
  x?: number
}

export const updateEggSeed = (update: EggSeed) => {
  if (typeof localStorage === 'undefined') return

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
  const existingSeed = existingItem ? (JSON.parse(existingItem) as EggSeed) : null

  return existingSeed
}

type AchievementsUnlocked = {
  t?: boolean // birb
  e?: boolean // egg
  m?: boolean // moon
  b?: boolean // balloon
  r?: boolean // maneuvre
}

export const getAchievements = (): AchievementsUnlocked | null => {
  if (typeof localStorage === 'undefined') return null

  const existingItem = localStorage.getItem(achievementsKey)
  const existingAchievements = existingItem ? (JSON.parse(existingItem) as AchievementsUnlocked) : null

  return existingAchievements
}

export const updateAchievements = (update: AchievementsUnlocked) => {
  const existingAchievements = getAchievements()

  const newSeed: AchievementsUnlocked = {
    ...existingAchievements,
    ...update,
  }

  localStorage.setItem(achievementsKey, JSON.stringify(newSeed))
}
