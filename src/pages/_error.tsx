import React, { useState } from 'react'

import { Box, Button, Flex, Heading, Link, Text } from '@chakra-ui/core'

const ErrorPage: React.FC = props => {
  const [isLoad, setIsLoad] = useState<boolean>(false)

  return (
    <Flex justifyContent='center' alignItems='center' height='100%'>
      <Box
        bg='white'
        width={[22 / 24, 16 / 24, 10 / 24, 6 / 24]}
        boxShadow='0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
        p={6}
        borderRadius={10}>
        <Heading size='lg'>Crashed</Heading>
        <Text py={5}>App has crashed painfully...</Text>
        <Link href='/' _hover={{ textDecoration: 'none' }}>
          <Button
            width='100%'
            isLoading={isLoad}
            onClick={() => setIsLoad(true)}>
            Restart
          </Button>
        </Link>
      </Box>
    </Flex>
  )
}

export default ErrorPage
