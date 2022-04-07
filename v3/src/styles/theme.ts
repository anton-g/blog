import { DefaultTheme } from 'styled-components'

// Remember to update styled.d.ts when adding/removing colors here.
import { crimson, gray, teal, blue } from '@radix-ui/colors'

const lightTheme: DefaultTheme = {
  colors: {
    ...gray,
    ...teal,
    ...blue,
    primary1: crimson.crimson1,
    primary2: crimson.crimson2,
    primary3: crimson.crimson3,
    primary4: crimson.crimson4,
    primary5: crimson.crimson5,
    primary6: crimson.crimson6,
    primary7: crimson.crimson7,
    primary8: crimson.crimson8,
    primary9: crimson.crimson9,
    primary10: crimson.crimson10,
    primary11: crimson.crimson11,
    primary12: crimson.crimson12,
  },
}

export { lightTheme }
