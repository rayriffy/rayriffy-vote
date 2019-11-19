import React, { useState } from 'react'

import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Stack,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from '@chakra-ui/core'

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
            <Box
              bg='white'
              p={6}
              boxShadow='0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
              borderRadius={10}>
              <Heading size='xl'>Dashboard</Heading>
              <Divider />

              <Flex flexWrap='wrap' py={4}>
                <Box width={['100%', '100%', 1 / 2]} pr={[0, 0, 4]}>
                  <Stack spacing={6}>
                    <Box>
                      <Heading size='md' pb={2}>
                        Quick Actions
                      </Heading>
                      <Stack spacing={2}>
                        <Button>Open vote</Button>
                        <Button>Reset score</Button>
                      </Stack>
                    </Box>
                    <Box pb={[6, 6, 0]}>
                      <Heading size='md' pb={2}>
                        Results
                      </Heading>
                      <StatGroup>
                        <Stat>
                          <StatLabel>Prayuth</StatLabel>
                          <StatNumber>345,670</StatNumber>
                          <StatHelpText>1st</StatHelpText>
                        </Stat>

                        <Stat>
                          <StatLabel>Thaksin</StatLabel>
                          <StatNumber>45</StatNumber>
                          <StatHelpText>2nd</StatHelpText>
                        </Stat>
                      </StatGroup>
                    </Box>
                  </Stack>
                </Box>
                <Box width={['100%', '100%', 1 / 2]} pl={[0, 0, 4]}>
                  <Stack spacing={6}>
                    <Box>
                      <Heading size='md' pb={2}>
                        Choices
                      </Heading>
                    </Box>
                  </Stack>
                </Box>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Flex>
  )
}

export default AdminPanelComponents
