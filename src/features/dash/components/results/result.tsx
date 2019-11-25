import React, { useEffect, useState } from 'react'

import { Box, Heading, Text } from '@chakra-ui/core'
import styled from '@emotion/styled'

import AnimatedNumber from 'animated-number-react'

import { IResultProps } from '../../@types/IResultProps'

interface IStyledBoxProps {
  tada: boolean
}

const StyledBox = styled(Box)<IStyledBoxProps>`
  ${(props: IStyledBoxProps) =>
    props.tada ? `animation: tada infinite 1s;` : ``}
`

const ResultComponent: React.FC<IResultProps> = props => {
  const { title, count } = props

  const [isTada, setIsTada] = useState<boolean>(false)

  useEffect(() => {
    console.log(`Tada callback for ${title}`)

    const timer = setTimeout(() => {
      setIsTada(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [isTada])

  return (
    <StyledBox
      p={6}
      borderRadius={10}
      bg='white'
      tada={isTada}
      boxShadow='0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'>
      <Text fontSize='2xl' pb={2} textAlign='center'>
        {title}
      </Text>
      <Heading textAlign='center'>
        <AnimatedNumber
          value={count}
          duration={500}
          complete={() => setIsTada(true)}
          formatValue={(value: number) => Math.floor(value)}
        />
      </Heading>
    </StyledBox>
  )
}

export default ResultComponent
