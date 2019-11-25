import React, { useState } from 'react'

import { useAsyncEffect } from 'use-async-effect'

import { Box, Flex, Heading, Image, Text } from '@chakra-ui/core'

import 'firebase/firestore'
import firebase from '../../../core/services/firebase'

import Results from './results'
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
    <React.Fragment>
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
          ) : isVoteOpen === true ? (
            <Results />
          ) : null}
        </Flex>
      </Box>
      <Box
        position='fixed'
        top={4}
        right={4}
        height={'150px'}
        bg='white'
        display={['none', 'none', 'block', 'block']}
        borderRadius={10}
        boxShadow='0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
        p={2}>
        <Flex height='100%' alignItems='center'>
          <Image width='auto' height='100%' src='/static/qr.png' />
          <Box pl={4}>
            <Text fontSize='lg'>Get your phone now!</Text>
            <Heading size='md'>vote.rayriffy.com</Heading>
          </Box>
        </Flex>
      </Box>
    </React.Fragment>
  )
}

export default DashComponent
