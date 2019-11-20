import React, { useEffect, useState } from 'react'

import 'firebase/firestore'
import firebase from '../../../core/services/firebase'

import { Button, Flex, Spinner, Stack, useToast } from '@chakra-ui/core'

import { IVoteProps } from '../@types/IVoteProps'

interface IChoice {
  id: string
  name: string
  count: number
}

const VoteComponent: React.FC<IVoteProps> = props => {
  const { user } = props

  const toast = useToast()

  const [choices, setChoices] = useState<IChoice[] | null>(null)
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)

  const [isVoteLoad, setIsVoteLoad] = useState<boolean>(false)

  const handleVote = (id: string, name: string) => {
    setIsVoteLoad(true)

    if (selectedChoice === id) {
      firebase
        .firestore()
        .collection('system')
        .doc('votes')
        .collection('pools')
        .doc(user.uid)
        .delete()
        .then(() => {
          toast({
            title: 'Success',
            description: `You've removed vote for ${name}`,
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
        })
        .catch(e => {
          toast({
            title: 'Failed',
            description: `Unable to remove the vote.`,
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        })
        .finally(() => {
          setIsVoteLoad(false)
        })
    } else {
      firebase
        .firestore()
        .collection('system')
        .doc('votes')
        .collection('pools')
        .doc(user.uid)
        .set({
          choice: id,
        })
        .then(() => {
          toast({
            title: 'Success',
            description: `You've voted for ${name}`,
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
        })
        .catch(e => {
          toast({
            title: 'Failed',
            description: `Unable to vote. Please try again later.`,
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        })
        .finally(() => {
          setIsVoteLoad(false)
        })
    }
  }

  useEffect(() => {
    firebase
      .firestore()
      .collection('system')
      .doc('votes')
      .collection('choices')
      .get()
      .then(collection => {
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
  }, [])

  useEffect(() => {
    const listener = firebase
      .firestore()
      .collection('system')
      .doc('votes')
      .collection('pools')
      .doc(user.uid)
      .onSnapshot(
        doc => {
          const data = doc.data()

          if (data) {
            setSelectedChoice(data.choice)
          } else {
            setSelectedChoice(null)
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
    <React.Fragment>
      {choices === null ? (
        <Flex justifyContent='center' py={8}>
          <Spinner size='lg' />
        </Flex>
      ) : (
        <Flex justifyContent='center' py={3}>
          <Stack spacing={4} width={['100%', '100%', 20 / 24, 18 / 24]}>
            {choices.map(choice => (
              <Button
                width='100%'
                variantColor={selectedChoice === choice.id ? `blue` : undefined}
                onClick={() => handleVote(choice.id, choice.name)}
                key={`vote-choice-${choice.id}`}
                isLoading={isVoteLoad}>
                {choice.name}
              </Button>
            ))}
          </Stack>
        </Flex>
      )}
    </React.Fragment>
  )
}

export default VoteComponent
