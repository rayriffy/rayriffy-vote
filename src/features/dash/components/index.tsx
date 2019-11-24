import React, { useState } from 'react'

import { useAsyncEffect } from 'use-async-effect'

import { Box, Flex, Heading, Text } from '@chakra-ui/core'

import 'firebase/firestore'
import firebase from '../../../core/services/firebase'

import Wait from './wait'

const DashComponent: React.FC = props => {
  const [isVoteOpen, setIsVoteOpen] = useState<boolean | null>(null)

  useAsyncEffect(async () => {
    const instance = await firebase()

    instance
      .firestore()
      .collection('system')
      .doc('votes')
      .onSnapshot(doc => {
        const data = doc.data()

        if (data) {
          setIsVoteOpen(data.open)
        }
      })
  }, [])

  return (
    <Box
      background='linear-gradient(45deg, rgba(69,20,90,1) 0%, rgba(255,83,0,1) 100%)'
      height='100%'>
      <Flex justifyContent='center' alignItems='center' height='100%'>
        {isVoteOpen === null ? (
          <Box
            bg='white'
            width={[22 / 24, 16 / 24, 10 / 24, 6 / 24]}
            boxShadow='0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
            p={6}
            borderRadius={10}>
            <Heading size='lg'>Initializing</Heading>
            <Text pt={5}>Initializing application</Text>
          </Box>
        ) : isVoteOpen === false ? (
          <Wait />
        ) : null}
      </Flex>
    </Box>
  )
}

export default DashComponent
