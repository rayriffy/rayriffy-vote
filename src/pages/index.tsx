import React from 'react'

import { Box, Flex } from '@chakra-ui/core'

import Vote from '../features/vote'

const IndexPage: React.FC = props => {
  return (
    <Flex justifyContent='center' width='100%' {...props}>
      <Box width={[22 / 24, 16 / 24, 12 / 24, 8 / 24]} height='100%' pt={6}>
        <Vote />
      </Box>
    </Flex>
  )
}

export default IndexPage
