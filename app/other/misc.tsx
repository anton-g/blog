import { twMerge } from 'tailwind-merge'
import { type ClassValue, clsx } from 'clsx'
import { Size } from '@react-three/fiber'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const get3DUtils = (size: Size) => {
  const getX = (factor: number) => {
    return size.width * factor - size.width / 2
  }
  const getY = (factor: number) => {
    return size.height * factor - size.height / 2
  }

  return { getX, getY }
}
