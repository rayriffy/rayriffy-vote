import React, { useState } from 'react'

import { useAsyncEffect } from 'use-async-effect'

import 'firebase/firestore'
import firebase from '../../../../core/services/firebase'

import { Box, Divider, Flex, Heading, Stack, useToast } from '@chakra-ui/core'

import Choices from './choices'
import QuickActions from './quick'
import Results from './results'

const DashboardComponent: React.FC = props => {
  const toast = useToast()

  const [open, setOpen] = useState<boolean | null>(null)

  useAsyncEffect(async () => {
    const instance = await firebase()

    const listener = instance
      .firestore()
      .collection('system')
      .doc('votes')
      .onSnapshot(
        res => {
          const data = res.data()
          if (data) {
            setOpen(data.open)
          }
        },
        () => {
          toast({
            title: 'Unstable connection',
            description:
              'Data may not be shown in real-time but it will trying to catch up.',
            status: 'warning',
            duration: 5000,
            isClosable: true,
          })
        }
      )

    return listener
  }, [])

  return (
    <Box
      bg='white'
      p={6}
      boxShadow='0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      borderRadius={10}>
      <Heading size='xl'>Dashboard</Heading>
      <Divider />

      <Flex flexWrap='wrap' py={4}>
        <Box width={['100%', '100%', 1 / 2]} pr={[0, 0, 8]}>
          <Stack spacing={6}>
            <Box>
              <QuickActions open={open} />
            </Box>
            <Box pb={[4, 4, 0]}>
              <Results />
            </Box>
          </Stack>
        </Box>
        <Box width={['100%', '100%', 1 / 2]} pl={[0, 0, 8]}>
          <Stack spacing={6}>
            <Box>
              <Choices open={open} />
            </Box>
          </Stack>
        </Box>
      </Flex>
    </Box>
  )
}

export default DashboardComponent
