import React from 'react'
import App from './src/App'

require('prismjs/plugins/line-numbers/prism-line-numbers.css')

export const wrapRootElement = ({ element }) => {
  return <App>{element}</App>
}
