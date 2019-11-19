import React, { useEffect, useState } from 'react'

import 'firebase/firestore'
import firebase from '../../core/services/firebase'

import {
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

interface IChoice {
  id: string
  name: string
  count: number
}

const VoteComponent: React.FC = props => {
  const toast = useToast()

  const [choices, setChoices] = useState<IChoice[] | null>(null)
  const [isVoteOpen, setIsVoteOpen] = useState<boolean | null>(null)

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
      .orderBy('name')
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
    <Box
      bg='white'
      p={6}
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
  )
}

export default VoteComponent
