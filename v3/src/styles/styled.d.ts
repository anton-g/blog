/* eslint @typescript-eslint/no-empty-interface: "off" */

import 'styled-components'

import { gray, teal, blue, orange } from '@radix-ui/colors'

type CustomColors = {
  primary1: string
  primary2: string
  primary3: string
  primary4: string
  primary5: string
  primary6: string
  primary7: string
  primary8: string
  primary9: string
  primary10: string
  primary11: string
  primary12: string
}
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof gray & typeof teal & typeof blue & typeof orange & CustomColors
  }
}
