import React from 'react'

import { Helmet } from 'react-helmet'

import { css, Global } from '@emotion/core'

import DashFeature from '../features/dash/components'

const DashPage: React.FC = props => {
  return (
    <React.Fragment>
      <Helmet title='Dash' />
      <Global
        styles={css`
          @-webkit-keyframes tada {
            from {
              -webkit-transform: scale3d(1, 1, 1);
              transform: scale3d(1, 1, 1);
            }

            10%,
            20% {
              -webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
              transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
            }

            30%,
            50%,
            70%,
            90% {
              -webkit-transform: scale3d(1.4, 1.4, 1.4) rotate3d(0, 0, 1, 3deg);
              transform: scale3d(1.4, 1.4, 1.4) rotate3d(0, 0, 1, 3deg);
            }

            40%,
            60%,
            80% {
              -webkit-transform: scale3d(1.4, 1.4, 1.4) rotate3d(0, 0, 1, -3deg);
              transform: scale3d(1.4, 1.4, 1.4) rotate3d(0, 0, 1, -3deg);
            }

            to {
              -webkit-transform: scale3d(1, 1, 1);
              transform: scale3d(1, 1, 1);
            }
          }

          @keyframes tada {
            from {
              -webkit-transform: scale3d(1, 1, 1);
              transform: scale3d(1, 1, 1);
            }

            10%,
            20% {
              -webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
              transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
            }

            30%,
            50%,
            70%,
            90% {
              -webkit-transform: scale3d(1.4, 1.4, 1.4) rotate3d(0, 0, 1, 3deg);
              transform: scale3d(1.4, 1.4, 1.4) rotate3d(0, 0, 1, 3deg);
            }

            40%,
            60%,
            80% {
              -webkit-transform: scale3d(1.4, 1.4, 1.4) rotate3d(0, 0, 1, -3deg);
              transform: scale3d(1.4, 1.4, 1.4) rotate3d(0, 0, 1, -3deg);
            }

            to {
              -webkit-transform: scale3d(1, 1, 1);
              transform: scale3d(1, 1, 1);
            }
          }
        `}
      />
      <DashFeature />
    </React.Fragment>
  )
}

export default DashPage
