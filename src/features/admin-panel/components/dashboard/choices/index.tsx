import React, { useEffect, useState } from 'react'

import 'firebase/firestore'
import firebase from '../../../../../core/services/firebase'

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/core'

import Choice from './choice'

interface IChoice {
  id: string
  name: string
  count: number
}

const ChoicesComponent: React.FC = props => {
  const toast = useToast()

  const [choices, setChoices] = useState<IChoice[] | null>(null)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [modalAddLoad, setModalAddLoad] = useState<boolean>(false)
  const [modalInput, setModalInput] = useState<string>('')

  const addNewChoice = (name: string) => {
    setModalAddLoad(true)

    firebase
      .firestore()
      .collection('system')
      .doc('votes')
      .collection('choices')
      .add({
        name,
        count: 0,
      })
      .then(() => {
        toast({
          title: 'Success',
          description: 'Choice created.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      })
      .catch(() => {
        toast({
          title: 'Failed',
          description: 'Unable to create choice.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      })
      .finally(() => setModalAddLoad(false))
      .finally(onClose)
  }

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
    <React.Fragment>
      <Flex pb={2}>
        <Heading size='md'>Choices</Heading>
        <Box mx='auto' />
        <IconButton onClick={onOpen} aria-label='Add' icon='add' size='xs' />
      </Flex>
      {choices === null ? (
        <Flex justifyContent='center'>
          <Spinner />
        </Flex>
      ) : (
        <React.Fragment>
          {choices.map(choice => (
            <Box key={`dashboard-choices-${choice.id}`} py={2}>
              <Choice {...choice} />
            </Box>
          ))}
        </React.Fragment>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new choice</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl py={2}>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder='Name'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const name = e.target.value
                  setModalInput(name)
                }}
              />
              <FormHelperText>Example: Johny Ive, Prayuth</FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              variantColor='blue'
              isLoading={modalAddLoad}
              onClick={() => addNewChoice(modalInput)}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  )
}

export default ChoicesComponent
