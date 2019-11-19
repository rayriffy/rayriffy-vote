import React, { useEffect, useState } from 'react'

import { auth, User } from 'firebase'
import 'firebase/auth'
import firebase from '../core/services/firebase'

import { Box, Button, Flex, Heading, Spinner, Text } from '@chakra-ui/core'

import Vote from '../features/vote/components'

const IndexPage: React.FC = props => {
  const [authState, setAuthState] = useState<number>(0)
  const [user, setUser] = useState<User | null>(null)

  const [isLoginLoad, setIsLoginLoad] = useState<boolean>(false)

  const handleLogin = () => {
    setIsLoginLoad(true)

    firebase
      .auth()
      .signInWithPopup(new auth.GoogleAuthProvider())
      .finally(() => {
        setIsLoginLoad(false)
      })
  }

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => setAuthState(1))
      .catch(() => setAuthState(-1))
  }

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged(res => {
      if (res === null) {
        setAuthState(1)
      } else {
        setUser(res)
        setAuthState(2)
      }
    })

    return listener
  }, [])

  return (
    <React.Fragment>
      {authState !== 2 ? (
        <Flex justifyContent='center' alignItems='center' height='100%'>
          <Box
            bg='white'
            width={[22 / 24, 16 / 24, 10 / 24, 6 / 24]}
            boxShadow='0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
            p={6}
            borderRadius={10}>
            {authState === 0 ? (
              <React.Fragment>
                <Heading size='lg'>Initializing</Heading>
                <Text pt={5}>Initializing application</Text>
              </React.Fragment>
            ) : authState === 1 ? (
              <React.Fragment>
                <Heading size='lg'>Authentication Required</Heading>
                <Text py={5}>
                  Please use Google Account to sign-in in order to access this
                  page
                </Text>
                <Button
                  width='100%'
                  isLoading={isLoginLoad}
                  onClick={() => handleLogin()}>
                  Sign in
                </Button>
              </React.Fragment>
            ) : authState === -1 ? (
              <React.Fragment>
                <Heading size='lg'>Crashed</Heading>
                <Text>App has crashed painfully...</Text>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Flex height='100%' justifyContent='center' alignItems='center'>
                  <Spinner />
                </Flex>
              </React.Fragment>
            )}
          </Box>
        </Flex>
      ) : user !== null ? (
        <Flex justifyContent='center' width='100%' {...props}>
          <Box width={[22 / 24, 16 / 24, 12 / 24, 8 / 24]} height='100%' pt={6}>
            <Vote onLogout={handleLogout} user={user} />
          </Box>
        </Flex>
      ) : null}
    </React.Fragment>
  )
}

export default IndexPage
