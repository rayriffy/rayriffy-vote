import React, { useEffect, useRef, useState } from 'react'

import 'firebase/firestore'
import firebase from '../../../../core/services/firebase'

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  Heading,
  Spinner,
  Stack,
  useToast,
} from '@chakra-ui/core'

const QuickComponent: React.FC = props => {
  const toast = useToast()

  const [open, setOpen] = useState<boolean | null>(null)
  const [isVoteButtonLoad, setIsVoteButtonLoad] = useState<boolean>(false)

  const [isResetOpen, setIsResetOpen] = useState<boolean>(false)
  const [isResetButtonLoad, setIsResetButtonLoad] = useState<boolean>(false)
  const resetCancelRef = useRef(null)

  const handleToggleVote = () => {
    if (open !== null) {
      setIsVoteButtonLoad(true)

      const newVoteState = !open

      firebase
        .firestore()
        .collection('system')
        .doc('votes')
        .update({
          open: newVoteState,
        })
        .then(() => {
          toast({
            title: 'Success',
            description: newVoteState ? 'Vote is open!' : 'Vote is closed!',
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
        })
        .catch(() => {
          toast({
            title: 'Failed',
            description: `Unable to ${newVoteState ? 'open' : 'close'} vote`,
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        })
        .finally(() => {
          setIsVoteButtonLoad(false)
        })
    }
  }

  const handleReset = async () => {
    // TODO: Reset score
    setIsResetButtonLoad(true)

    try {
      const snapshot = await firebase
        .firestore()
        .collection('system')
        .doc('votes')
        .collection('choices')
        .get()

      await snapshot.docs.map(async doc => {
        await firebase
          .firestore()
          .collection('system')
          .doc('votes')
          .collection('choices')
          .doc(doc.id)
          .update({ count: 0 })

        return true
      })

      toast({
        title: 'Success',
        description: 'All votes have been resetted',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })

      setIsResetButtonLoad(false)
      setIsResetOpen(false)
    } catch {
      toast({
        title: 'Failed',
        description: `Unable to reset the vote`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })

      setIsResetButtonLoad(false)
      setIsResetOpen(false)
    }
  }

  useEffect(() => {
    const listener = firebase
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
    <React.Fragment>
      <Heading size='md' pb={2}>
        Quick Actions
      </Heading>
      {open === null ? (
        <Flex justifyContent='center' py={2}>
          <Spinner />
        </Flex>
      ) : (
        <Stack spacing={2}>
          <Button
            variantColor={open ? 'red' : 'green'}
            onClick={handleToggleVote}
            isLoading={isVoteButtonLoad}>
            {open ? 'Close vote' : 'Open Vote'}
          </Button>
          <Button isDisabled={open} onClick={() => setIsResetOpen(true)}>
            Reset score
          </Button>
        </Stack>
      )}
      <AlertDialog
        isOpen={isResetOpen}
        leastDestructiveRef={resetCancelRef}
        onClose={() => setIsResetOpen(false)}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Reset score
          </AlertDialogHeader>

          <AlertDialogBody>
            All score will be reset to <b>0</b>!
            <br />
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={resetCancelRef} onClick={() => setIsResetOpen(false)}>
              Cancel
            </Button>
            <Button
              variantColor='red'
              onClick={handleReset}
              ml={3}
              isLoading={isResetButtonLoad}>
              Reset
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </React.Fragment>
  )
}

export default QuickComponent
