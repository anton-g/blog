import { createGlobalStyle } from 'styled-components'
import { gray, crimson } from '@radix-ui/colors'

export default createGlobalStyle`
  :root {
    --color-primary1: ${crimson.crimson1};
    --color-primary2: ${crimson.crimson2};
    --color-primary3: ${crimson.crimson3};
    --color-primary4: ${crimson.crimson4};
    --color-primary5: ${crimson.crimson5};
    --color-primary6: ${crimson.crimson6};
    --color-primary7: ${crimson.crimson7};
    --color-primary8: ${crimson.crimson8};
    --color-primary9: ${crimson.crimson9};
    --color-primary10: ${crimson.crimson10};
    --color-primary11: ${crimson.crimson11};
    --color-primary12: ${crimson.crimson12};

    --color-gray1: ${gray.gray1};
    --color-gray2: ${gray.gray2};
    --color-gray3: ${gray.gray3};
    --color-gray4: ${gray.gray4};
    --color-gray5: ${gray.gray5};
    --color-gray6: ${gray.gray6};
    --color-gray7: ${gray.gray7};
    --color-gray8: ${gray.gray8};
    --color-gray9: ${gray.gray9};
    --color-gray10: ${gray.gray10};
    --color-gray11: ${gray.gray11};
    --color-gray12: ${gray.gray12};
  }

  html,
  body {
    padding: 0;
    margin: 0;
    font-family: var(--font-jakarta), BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
      Helvetica Neue, sans-serif;
    height: 100%;
  }
  #__next {
    height: 100%;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  * {
    box-sizing: border-box;
    ::selection {
      color: var(--color-primary2);
      background: var(--color-primary11);
    }
  }
`
