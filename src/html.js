import React from 'react'
import PropTypes from 'prop-types'

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="monetization" content="$ilp.uphold.com/zwax7UDJ3FLD" />
        <link href="https://github.com/anton-g" rel="me" />
        <link rel="webmention" href="https://webmention.io/antongunnarsson.com/webmention" />
        <link rel="pingback" href="https://webmention.io/antongunnarsson.com/xmlrpc" />
        {props.headComponents}
        <script
          src="https://rewarding-scientific.b-cdn.net/script.js"
          data-spa="auto"
          data-site="TZJQFTNI"
          defer
        ></script>
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div key={`body`} id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }} />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
