import React, { createContext } from 'react'
import type { ReactNode } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useContext } from 'react'

type UserConfigState = {
  confettiColor1: string
  confettiColor2: string
  confettiColor3: string
  confettiColor4: string
  confettiColor5: string
}

const initialConfig: UserConfigState = {
  confettiColor1: '#a864fd',
  confettiColor2: '#29cdff',
  confettiColor3: '#78ff44',
  confettiColor4: '#ff718d',
  confettiColor5: '#fdff6a',
}

export const UserConfigContext = createContext<{
  userConfig: UserConfigState | undefined
  updateConfig: (config: UserConfigState) => void
}>(null!)

export const UserConfigProvider = ({ children }: { children: ReactNode }) => {
  const [userConfig, setUserConfig] = useLocalStorage('user-config', initialConfig)

  return (
    <UserConfigContext.Provider value={{ userConfig: userConfig, updateConfig: setUserConfig }}>
      {children}
    </UserConfigContext.Provider>
  )
}

export const useUserConfig = () => {
  return useContext(UserConfigContext)
}
