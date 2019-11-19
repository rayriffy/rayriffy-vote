import React from 'react'

import { Box, Divider, Flex, Heading, Stack } from '@chakra-ui/core'

import QuickActions from './quick'
import Results from './results'

const DashboardComponent: React.FC = props => {
  return (
    <Box
      bg='white'
      p={6}
      boxShadow='0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      borderRadius={10}>
      <Heading size='xl'>Dashboard</Heading>
      <Divider />

      <Flex flexWrap='wrap' py={4}>
        <Box width={['100%', '100%', 1 / 2]} pr={[0, 0, 4]}>
          <Stack spacing={6}>
            <Box>
              <QuickActions />
            </Box>
            <Box pb={[4, 4, 0]}>
              <Heading size='md' pb={2}>
                Results
              </Heading>
              <Results />
            </Box>
          </Stack>
        </Box>
        <Box width={['100%', '100%', 1 / 2]} pl={[0, 0, 4]}>
          <Stack spacing={6}>
            <Box>
              <Heading size='md' pb={2}>
                Choices
              </Heading>
            </Box>
          </Stack>
        </Box>
      </Flex>
    </Box>
  )
}

export default DashboardComponent
