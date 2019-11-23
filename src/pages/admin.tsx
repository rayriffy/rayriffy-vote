import React, { useState } from 'react'

import { useAsyncEffect } from 'use-async-effect'

import { Helmet } from 'react-helmet'

import { auth, User } from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import firebase from '../core/services/firebase'

import { Box, Button, Flex, Heading, Spinner, Text } from '@chakra-ui/core'

import Admin from '../features/admin/components'

const AdminPage: React.FC = props => {
  const [authState, setAuthState] = useState<number>(0)
  const [user, setUser] = useState<User | null>(null)

  const [isLoginLoad, setIsLoginLoad] = useState<boolean>(false)

  const handleLogin = async () => {
    setIsLoginLoad(true)

    const instance = await firebase()

    instance
      .auth()
      .signInWithPopup(new auth.GoogleAuthProvider())
      .finally(() => {
        setIsLoginLoad(false)
      })
  }

  const handleLogout = async () => {
    const instance = await firebase()

    instance
      .auth()
      .signOut()
      .then(() => setAuthState(1))
      .catch(() => setAuthState(-1))
  }

  useAsyncEffect(async () => {
    const instance = await firebase()

    const listener = instance.auth().onAuthStateChanged(res => {
      if (res === null) {
        setAuthState(1)
      } else {
        setUser(res)
        setAuthState(2)

        instance
          .firestore()
          .collection('system')
          .doc('admins')
          .get()
          .then(doc => {
            const data = doc.data()
            if (data) {
              if (data.uids.includes(res.uid)) {
                // Authorized
                setAuthState(4)
              } else {
                // Unauthorized
                setAuthState(3)
              }
            }
          })
          .catch(() => {
            setAuthState(-1)
          })
      }
    })

    return listener
  }, [])

  return (
    <React.Fragment>
      <Helmet title='Admin' />
      {authState !== 4 ? (
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
            ) : authState === 2 ? (
              <React.Fragment>
                <Flex height='100%' justifyContent='center' alignItems='center'>
                  <Spinner />
                </Flex>
              </React.Fragment>
            ) : authState === 3 ? (
              <React.Fragment>
                <Heading size='lg'>Unauthorized</Heading>
                <Text py={5}>Admin is not an Admin</Text>
                <Button width='100%' onClick={() => handleLogout()}>
                  Sign out
                </Button>
              </React.Fragment>
            ) : authState === -1 ? (
              <React.Fragment>
                <Heading size='lg'>Crashed</Heading>
                <Text>App has crashed painfully...</Text>
              </React.Fragment>
            ) : null}
          </Box>
        </Flex>
      ) : user !== null ? (
        <Admin user={user} onLogout={handleLogout} />
      ) : null}
    </React.Fragment>
  )
}

export default AdminPage
