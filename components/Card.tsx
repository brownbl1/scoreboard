import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card as PCard } from 'react-native-paper'
import { usePrevious } from '../hooks/usePrevious'
import { Item } from '../types'
import { Team } from './Team'

const shouldHighlight = (item: Item, prevItem?: Item) => {
  if (!prevItem) return false

  return (
    prevItem.team1Name == item.team1Name &&
    (prevItem.team1Score != item.team1Score ||
      prevItem.team2Score != item.team2Score)
  )
}

type CardProps = {
  item: Item
}

export function Card({ item }: CardProps) {
  const prevItem = usePrevious(item)
  const highlight = shouldHighlight(item, prevItem)
  const yellowStyle = highlight ? styles.yellowBorder : {}

  return (
    <View style={styles.container}>
      <PCard style={[{ padding: 8 }, yellowStyle]}>
        <Text style={styles.status}>{item.gameStatus}</Text>
        <Team
          name={item.team1Name}
          img={item.team1Img}
          record={item.team1Record}
          score={item.team1Score}
        />
        <View style={{ height: 5 }} />
        <Team
          name={item.team2Name}
          img={item.team2Img}
          record={item.team2Record}
          score={item.team2Score}
        />
      </PCard>
    </View>
  )
}

const styles = StyleSheet.create({
  yellowBorder: {
    borderColor: 'yellow',
    borderWidth: 2,
  },
  container: {
    width: '50%',
    padding: 4,
  },
  status: {
    color: '#555',
    paddingBottom: 10,
  },
})
