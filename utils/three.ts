import { Size } from '@react-three/fiber'

export const getUtils = (size: Size) => {
  const getX = (factor: number) => {
    return size.width * factor - size.width / 2
  }
  const getY = (factor: number) => {
    return size.height * factor - size.height / 2
  }

  return { getX, getY }
}
