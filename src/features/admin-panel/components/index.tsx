import React, { useState } from 'react'

import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/core'

import Dashboard from './dashboard'

import { IProps } from '../@types/IProps'

const AdminPanelComponents: React.FC<IProps> = props => {
  const { onLogout, user } = props

  const [isLogoutLoad, setIsLogoutLoad] = useState<boolean>(false)

  const handleLogout = () => {
    setIsLogoutLoad(true)
    onLogout()
  }

  console.log(user)

  return (
    <Flex justifyContent='center'>
      <Box width={[22 / 24, 20 / 24, 18 / 24, 16 / 24]}>
        <Flex flexWrap='wrap'>
          <Box p={6} width={['100%', '100%', 3 / 10]}>
            <Box
              bg='white'
              p={6}
              boxShadow='0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
              borderRadius={10}>
              <Heading size='xl'>Menu</Heading>
              <Divider />

              <Box py={6}>
                <Flex>
                  <Box px={2}>
                    <Avatar
                      name={
                        user.displayName === null ? 'N/A' : user.displayName
                      }
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
          </Box>
          <Box p={6} width={['100%', '100%', 7 / 10]}>
            <Dashboard />
          </Box>
        </Flex>
      </Box>
    </Flex>
  )
}

export default AdminPanelComponents
