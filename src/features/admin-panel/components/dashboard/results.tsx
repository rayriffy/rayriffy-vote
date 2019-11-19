import React, { useEffect, useState } from 'react'

import 'firebase/firestore'
import firebase from '../../../../core/services/firebase'

import {
  Flex,
  Heading,
  Spinner,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/core'

interface IChoice {
  name: string
  count: number
}

const ResultComponent: React.FC = props => {
  const [choices, setChoices] = useState<IChoice[] | null>(null)

  useEffect(() => {
    const listener = firebase
      .firestore()
      .collection('system')
      .doc('votes')
      .collection('choices')
      .orderBy('name')
      .onSnapshot(collection => {
        setChoices(
          collection.docs.map(doc => {
            return {
              name: doc.data().name,
              count: doc.data().count,
            }
          })
        )
      })

    return listener
  }, [])

  return (
    <React.Fragment>
      <Heading size='md' pb={2}>
        Results
      </Heading>
      {choices === null ? (
        <Flex justifyContent='center'>
          <Spinner />
        </Flex>
      ) : (
        <StatGroup>
          {choices.map((choice, i) => (
            <Stat key={`dashboard-result-${i}`}>
              <StatLabel>{choice.name}</StatLabel>
              <StatNumber>{choice.count}</StatNumber>
              <StatHelpText>Rank: N/A</StatHelpText>
            </Stat>
          ))}
        </StatGroup>
      )}
    </React.Fragment>
  )
}

export default ResultComponent
