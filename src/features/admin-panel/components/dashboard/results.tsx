import { filter, sortBy } from 'lodash'
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
  id: string
  name: string
  count: number
}

interface IPool {
  id: string
  choice: string
}

const ResultComponent: React.FC = props => {
  const [choices, setChoices] = useState<IChoice[] | null>(null)

  const [pools, setPools] = useState<IPool[]>([])
  const [rank, setRank] = useState<string[]>([])

  useEffect(() => {
    const listener = firebase
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

  useEffect(() => {
    const listener = firebase
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

  useEffect(() => {
    if (choices !== null) {
      const rank = sortBy(
        choices.map(choice => {
          return {
            name: choice.name,
            choice: choice.id,
            count: filter(pools, pool => pool.choice === choice.id).length,
          }
        }),
        o => o.count
      )
        .reverse()
        .map(o => o.choice)

      setRank(rank)
    } else {
      setRank([])
    }
  }, [pools])

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
              <StatNumber>
                {pools.filter(o => choice.id === o.choice).length}
              </StatNumber>
              <StatHelpText>
                {console.log(rank.indexOf(choice.id))}
                Rank:{' '}
                {rank.indexOf(choice.id) === -1
                  ? `N/A`
                  : rank.indexOf(choice.id) + 1}
              </StatHelpText>
            </Stat>
          ))}
        </StatGroup>
      )}
    </React.Fragment>
  )
}

export default ResultComponent
