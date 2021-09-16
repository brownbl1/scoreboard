import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Card as PCard, Provider as PaperProvider } from 'react-native-paper'
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'
import { SvgUri } from 'react-native-svg'
import sample from './sample.json'

type Item = {
  gameStatus: string
  team1Name: string
  team1Img: string
  team1Record: string
  team1Score: string
  team2Name: string
  team2Img: string
  team2Record: string
  team2Score: string
}

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <MainView />
        <StatusBar />
      </PaperProvider>
    </SafeAreaProvider>
  )
}

function MainView() {
  const insets = useSafeAreaInsets()

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <View style={styles.cards}>
        {sample.map((item, i) => (
          <Card key={i} item={item} />
        ))}
      </View>
    </ScrollView>
  )
}

type CardProps = {
  item: Item
}

function Card({ item }: CardProps) {
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
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <SvgUri width="30" height="30" uri={props.img} />
        <Text style={{ paddingHorizontal: 5, fontWeight: 'bold' }}>
          {props.name}
        </Text>
        <Text style={{ fontSize: 12, color: 'gray' }}>{props.record}</Text>
      </View>
      <Text style={{ fontWeight: 'bold' }}>{props.score}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  cards: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 5,
  },
  container: {
    display: 'flex',
    height: '100%',

    backgroundColor: '#ddd',
  },
})
