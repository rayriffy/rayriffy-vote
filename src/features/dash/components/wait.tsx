import React, { useEffect, useState } from 'react'

import { Box, Heading } from '@chakra-ui/core'
import styled from '@emotion/styled'

interface IStyledBoxProps {
  tada: boolean
}

const StyledBox = styled(Box)<IStyledBoxProps>`
  ${(props: IStyledBoxProps) =>
    props.tada ? `animation: tada infinite 1s;` : ``}
`

const WaitComponent: React.FC = props => {
  const [isTada, setIsTada] = useState<boolean>(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTada(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <StyledBox
      bg='white'
      width={[22 / 24, 16 / 24, 10 / 24, 6 / 24]}
      boxShadow='0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      p={6}
      tada={isTada}
      borderRadius={10}>
      <Heading size='lg' textAlign='center'>
        Waiting for next round
      </Heading>
    </StyledBox>
  )
}

export default WaitComponent
