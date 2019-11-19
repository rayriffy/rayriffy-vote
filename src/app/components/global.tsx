import { css, Global as EmotionGlobal } from '@emotion/core'
import React from 'react'

const GlobalComponent: React.FC = props => {
  return (
    <EmotionGlobal
      styles={css`
        html {
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI',
            'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
            'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
            'Segoe UI Emoji', 'Segoe UI Symbol';
        }

        html,
        body,
        #__next {
          height: 100%;
        }
      `}
    />
  )
}

export default GlobalComponent
