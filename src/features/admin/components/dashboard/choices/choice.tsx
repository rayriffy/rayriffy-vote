import React, { useRef, useState } from 'react'

import 'firebase/firestore'
import firebase from '../../../../../core/services/firebase'

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  IconButton,
  Text,
  useToast,
} from '@chakra-ui/core'

import { IChoiceProps } from '../../../@types/IChoiceProps'

const ChoiceComponent: React.FC<IChoiceProps> = props => {
  const { id, name, count, open } = props

  const toast = useToast()

  const [isRemoveAlertOpen, setIsRemoveAlertOpen] = useState<boolean>(false)
  const removeCancelRef = useRef(null)

  const [isRemoveButtonLoad, setIsRemoveButtonLoad] = useState<boolean>(false)

  const handleRemove = () => {
    setIsRemoveButtonLoad(true)

    firebase
      .firestore()
      .collection('system')
      .doc('votes')
      .collection('choices')
      .doc(id)
      .delete()
      .then(() => {
        toast({
          title: 'Success',
          description: 'Selected choice removed from the system.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      })
      .catch(() => {
        toast({
          title: 'Failed',
          description: 'Unable to remove this choice.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      })
      .finally(() => {
        setIsRemoveAlertOpen(false)
        setIsRemoveButtonLoad(false)
      })
  }

  return (
    <React.Fragment>
      <Flex alignItems='center'>
        <IconButton
          size='xs'
          aria-label='remove'
          variantColor='red'
          icon='delete'
          isLoading={isRemoveButtonLoad}
          isDisabled={open === true}
          onClick={() => setIsRemoveAlertOpen(true)}
        />
        <Text pl={2}>{name}</Text>
      </Flex>
      <AlertDialog
        isOpen={isRemoveAlertOpen}
        leastDestructiveRef={removeCancelRef}
        onClose={() => setIsRemoveAlertOpen(false)}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Remove choice
          </AlertDialogHeader>

          <AlertDialogBody>
            Choice <b>{name}</b> with <b>{count}</b> votes will be removed!
            <br />
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={removeCancelRef}
              onClick={() => setIsRemoveAlertOpen(false)}>
              Cancel
            </Button>
            <Button
              variantColor='red'
              onClick={handleRemove}
              ml={3}
              isLoading={isRemoveButtonLoad}>
              Remove
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </React.Fragment>
  )
}

export default ChoiceComponent
