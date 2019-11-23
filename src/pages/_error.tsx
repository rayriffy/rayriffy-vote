import React from 'react'

import { Box, Flex, Heading, Text } from '@chakra-ui/core'

interface IProps {
  statusCode: number
}

const ErrorPage = (props: IProps) => {
  const { statusCode } = props

  return (
    <Flex justifyContent='center' alignItems='center' height='100%'>
      <Box
        bg='white'
        width={[22 / 24, 16 / 24, 10 / 24, 6 / 24]}
        boxShadow='0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
        p={6}
        borderRadius={10}>
        {statusCode === 404 ? (
          <React.Fragment>
            <Heading size='lg'>Not found</Heading>
            <Text pt={5}>Whoops! Looks like you're lost in the woods</Text>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Heading size='lg'>Crashed</Heading>
            <Text pt={5}>App has crashed painfully...</Text>
          </React.Fragment>
        )}
      </Box>
    </Flex>
  )
}

ErrorPage.getInitialProps = ({
  res,
  err,
}: {
  res: { statusCode: number }
  err: any
}) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404

  return { statusCode }
}

export default ErrorPage
