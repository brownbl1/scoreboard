import React from 'react'
import { Text, View } from 'react-native'
import { Card as PCard } from 'react-native-paper'
import { SvgUri } from 'react-native-svg'
import { Item } from '../types'

type CardProps = {
  item: Item
}

export function Card({ item }: CardProps) {
  return (
    <View style={{ width: '50%', padding: 5 }}>
      <PCard style={{ padding: 10 }}>
        <Text style={{ color: '#555', paddingBottom: 10 }}>
          {item.gameStatus}
        </Text>
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

type TeamProps = {
  name: string
  img: string
  record: string
  score: string
}

function Team(props: TeamProps) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          flex: 1,
          marginRight: 3,
          overflow: 'hidden',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <SvgUri width="30" height="30" uri={props.img} />
        <Text
          numberOfLines={1}
          style={{ paddingHorizontal: 5, fontWeight: 'bold' }}
        >
          {props.name}
        </Text>
        <Text style={{ fontSize: 12, color: 'gray' }}>{props.record}</Text>
      </View>
      <Text style={{ fontWeight: 'bold' }}>{props.score}</Text>
    </View>
  )
}
