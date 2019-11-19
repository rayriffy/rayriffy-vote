import React from 'react'
import { Helmet as ReactHelmet } from 'react-helmet'

const Helmet: React.FC = props => {
  return (
    <ReactHelmet
      htmlAttributes={{ lang: 'en' }}
      defaultTitle={`Riffy Vote`}
      titleTemplate={`%s · Riffy Vote`}
      link={[
        {
          href: `/static/icon.png`,
          rel: 'shortcut icon',
        },
        {
          href: `/static/icon.png`,
          rel: 'apple-touch-icon',
        },
      ]}
    />
  )
}

export default Helmet
