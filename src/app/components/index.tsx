import React from 'react'

import { Box, CSSReset, ThemeProvider } from '@chakra-ui/core'

import Global from './global'

const AppComponent: React.FC = props => {
  const { children } = props

  return (
    <ThemeProvider>
      <CSSReset />
      <Global />
      <Box bg='gray.50' as='main' height='100%' overflow='auto'>
        {children}
      </Box>
    </ThemeProvider>
  )
}

export default AppComponent
