import React from 'react'

import { Helmet } from 'react-helmet'

import { TadaAnimation } from '../core/components/animations'
import DashFeature from '../features/dash/components'

const DashPage: React.FC = props => {
  return (
    <React.Fragment>
      <Helmet title='Dash' />
      <TadaAnimation />
      <DashFeature />
    </React.Fragment>
  )
}

export default DashPage
