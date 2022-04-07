import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Yeseva+One&display=swap');

  html,
  body {
    padding: 0;
    margin: 0;
    font-family: Inter, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
      Helvetica Neue, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
    ::selection {
      color: ${({ theme }) => theme.colors.primary2};
      background: ${({ theme }) => theme.colors.primary11};
    }
  }
`
