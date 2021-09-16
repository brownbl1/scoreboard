import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card as PCard } from 'react-native-paper'
import { Item } from '../types'
import { Team } from './Team'

type CardProps = {
  item: Item
}

export function Card({ item }: CardProps) {
  return (
    <View style={styles.container}>
      <PCard style={{ padding: 8 }}>
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
  container: {
    width: '50%',
    padding: 4,
  },
  status: {
    color: '#555',
    paddingBottom: 10,
  },
})
