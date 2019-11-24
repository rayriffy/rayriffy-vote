import React, { useEffect, useState } from 'react'

import { useAsyncEffect } from 'use-async-effect'

import 'firebase/firestore'
import firebase from '../../../core/services/firebase'

import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Spinner,
  Text,
} from '@chakra-ui/core'

import Vote from './vote'

import { IProps } from '../@types/IProps'

const VoteComponent: React.FC<IProps> = props => {
  const { onLogout, user } = props

  const [isVoteOpen, setIsVoteOpen] = useState<boolean | null>(null)
  const [isLogoutLoad, setIsLogoutLoad] = useState<boolean>(false)

  const handleLogout = () => {
    setIsLogoutLoad(true)
    onLogout()
  }

  useAsyncEffect(async () => {
    const instance = await firebase()

    const listener = instance
      .firestore()
      .collection('system')
      .doc('votes')
      .onSnapshot(doc => {
        const data = doc.data()

        if (data) {
          setIsVoteOpen(data.open)
        }
      })

    return listener
  }, [])

  return (
    <React.Fragment>
      <Box
        bg='white'
        p={6}
        mb={8}
        boxShadow='0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
        borderRadius={10}>
        <Heading size='xl'>Vote</Heading>
        <Divider />
        {isVoteOpen === null ? (
          <Flex justifyContent='center' py={8}>
            <Spinner size='lg' />
          </Flex>
        ) : isVoteOpen === false ? (
          <Flex justifyContent='center' py={8}>
            <Text fontSize='2xl' fontWeight={500}>
              Waiting on next round
            </Text>
          </Flex>
        ) : isVoteOpen === true ? (
          <Vote user={user} />
        ) : null}
      </Box>

      <Box
        bg='white'
        p={6}
        boxShadow='0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
        borderRadius={10}>
        <Heading size='xl'>Menu</Heading>
        <Divider />

        <Box py={6}>
          <Flex justifyContent='center' alignItems='center'>
            <Box px={2}>
              <Avatar
                name={user.displayName === null ? 'N/A' : user.displayName}
                src={
                  user.photoURL === null
                    ? 'https://storage.rayriffy.com/files/image/profile/IMG_1100.jpeg'
                    : user.photoURL
                }
              />
            </Box>
            <Box px={2}>
              <Text fontSize='lg'>{user.displayName}</Text>
            </Box>
          </Flex>
        </Box>

        <Button
          width='100%'
          variantColor='red'
          onClick={handleLogout}
          isLoading={isLogoutLoad}>
          Sign out
        </Button>
      </Box>
    </React.Fragment>
  )
}

export default VoteComponent
