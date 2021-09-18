import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native'
import {
  ActivityIndicator,
  Provider as PaperProvider,
} from 'react-native-paper'
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'
import { Card } from './components/Card'
import { Header } from './components/Header'
import { Item } from './types'

export default function AppWrapper() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <App />
        <StatusBar />
      </PaperProvider>
    </SafeAreaProvider>
  )
}

function App() {
  const insets = useSafeAreaInsets()
  const [week, setWeek] = useState(1)
  const [data, setData] = useState<Item[]>()
  const [fetchTime, setFetchTime] = useState<Date>()
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    setRefreshing(true)
    fetch(
      `https://cbs-scoreboard-web.vercel.app/api/get-data?week=${week}`,
    ).then(async (res) => {
      const json = await res.json()
      setData(json)
      setRefreshing(false)
    })
  }, [week, fetchTime])

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => setFetchTime(new Date())}
        />
      }
    >
      <Header week={week} onWeekSelected={setWeek} />
      {refreshing && <ActivityIndicator style={styles.loading} />}
      <Body data={data} />
    </ScrollView>
  )
}

type BodyProps = {
  data?: Item[]
}

function _Body({ data }: BodyProps) {
  return (
    <View style={styles.cards}>
      {!!data && data.map((item, i) => <Card key={i} item={item} />)}
    </View>
  )
}

const Body = React.memo(_Body)

const styles = StyleSheet.create({
  loading: {
    margin: 10,
  },
  cards: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#ddd',
  },
})
