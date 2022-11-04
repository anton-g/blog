import {
  Abril_Fatface,
  Yeseva_One,
  Share_Tech_Mono,
  Plus_Jakarta_Sans,
} from '@next/font/google'

export const abril = Abril_Fatface({
  weight: '400',
  variable: '--font-abril',
  subsets: ['latin'],
})
export const yeseva = Yeseva_One({
  weight: '400',
  variable: '--font-yeseva',
  subsets: ['latin'],
})
export const shareTech = Share_Tech_Mono({
  weight: '400',
  variable: '--font-share-tech',
  subsets: ['latin'],
})
export const plusJakarta = Plus_Jakarta_Sans({
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
  subsets: ['latin'],
})
