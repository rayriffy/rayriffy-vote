import React, { useEffect, useState } from 'react'

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
  Stack,
  Text,
  useToast,
} from '@chakra-ui/core'

import { IVoteProps } from '../@types/IVoteProps'

interface IChoice {
  id: string
  name: string
  count: number
}

const VoteComponent: React.FC<IVoteProps> = props => {
  const { onLogout, user } = props

  const toast = useToast()

  const [choices, setChoices] = useState<IChoice[] | null>(null)
  const [isVoteOpen, setIsVoteOpen] = useState<boolean | null>(null)

  const [isLogoutLoad, setIsLogoutLoad] = useState<boolean>(false)

  const handleLogout = () => {
    setIsLogoutLoad(true)
    onLogout()
  }

  useEffect(() => {
    const listener = firebase
      .firestore()
      .collection('system')
      .doc('votes')
      .onSnapshot(
        doc => {
          const data = doc.data()

          if (data) {
            setIsVoteOpen(data.open)
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

  useEffect(() => {
    const listener = firebase
      .firestore()
      .collection('system')
      .doc('votes')
      .collection('choices')
      .orderBy('name', 'desc')
      .onSnapshot(collection => {
        setChoices(
          collection.docs.map(doc => {
            return {
              id: doc.id,
              name: doc.data().name,
              count: doc.data().count,
            }
          })
        )
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
        ) : isVoteOpen === true && choices !== null ? (
          <Flex justifyContent='center' py={3}>
            <Stack spacing={4} width={['100%', '100%', 20 / 24, 18 / 24]}>
              {choices.map(choice => (
                <Button width='100%' key={`vote-choice-${choice.id}`}>
                  {choice.name}
                </Button>
              ))}
            </Stack>
          </Flex>
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
          <Flex alignItems='center'>
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
