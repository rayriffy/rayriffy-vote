import React, { useState } from 'react'

import { useAsyncEffect } from 'use-async-effect'

import 'firebase/firestore'
import firebase from '../../../../core/services/firebase'

import { Box, Flex, Heading, Text } from '@chakra-ui/core'
import styled from '@emotion/styled'

import Result from './result'

interface IStyledBoxProps {
  tada: boolean
}

interface IChoice {
  id: string
  name: string
  count: number
}

interface IPool {
  id: string
  choice: string
}

const StyledBox = styled(Box)<IStyledBoxProps>`
  ${(props: IStyledBoxProps) =>
    props.tada ? `animation: tada infinite 1s;` : ``}
`

const ResultsComponent: React.FC = props => {
  const [choices, setChoices] = useState<IChoice[] | null>(null)

  const [pools, setPools] = useState<IPool[]>([])

  useAsyncEffect(async () => {
    const instance = await firebase()

    const listener = instance
      .firestore()
      .collection('system')
      .doc('votes')
      .collection('choices')
      .orderBy('name', 'desc')
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

  useAsyncEffect(async () => {
    const instance = await firebase()

    const listener = instance
      .firestore()
      .collection('system')
      .doc('votes')
      .collection('pools')
      .onSnapshot(collection => {
        setPools(
          collection.docs.map(doc => {
            return {
              id: doc.id,
              choice: doc.data().choice,
            }
          })
        )
      })

    return listener
  }, [])

  return (
    <Box width={[22 / 24, 20 / 24, 18 / 24, 16 / 24]}>
      <Flex justifyContent='center' alignItems='center' flexWrap='wrap'>
        {choices === null ? (
          <StyledBox
            bg='white'
            width={[22 / 24, 16 / 24, 10 / 24, 6 / 24]}
            boxShadow='0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
            p={6}
            tada={true}
            borderRadius={10}>
            <Heading size='lg'>Vote has open!</Heading>
            <Text pt={5}>Go to vote on your phone now!!!</Text>
          </StyledBox>
        ) : (
          <React.Fragment>
            {choices.map((choice, i) => (
              <Box
                width={['100%', '100%', 1 / 2, 1 / 4]}
                key={`dash-choice-${i}`}
                p={6}>
                <Result
                  title={choice.name}
                  count={pools.filter(o => choice.id === o.choice).length}
                />
              </Box>
            ))}
          </React.Fragment>
        )}
      </Flex>
    </Box>
  )
}

export default ResultsComponent
