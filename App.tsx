import { getPersistor } from '@rematch/persist'
import AppLoading from 'expo-app-loading'
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
import { connect, Provider as StoreProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { Card } from './components/Card'
import { Header } from './components/Header'
import { usePrevious } from './hooks/usePrevious'
import { Dispatch, RootState, store } from './store'
import { Item } from './types'

const persistor = getPersistor()

export default function AppWrapper() {
  return (
    <StoreProvider store={store}>
      <PersistGate persistor={persistor} loading={<AppLoading />}>
        <SafeAreaProvider>
          <PaperProvider>
            <App />
            <StatusBar />
          </PaperProvider>
        </SafeAreaProvider>
      </PersistGate>
    </StoreProvider>
  )
}

const mapState = ({ settings }: RootState) => ({
  week: settings.selectedWeek,
})

const mapDispatch = ({ settings }: Dispatch) => ({
  setWeek: settings.setWeek,
})

type Props = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>

function _App({ week, setWeek }: Props) {
  const insets = useSafeAreaInsets()
  const [data, setData] = useState<Item[]>()
  const [fetchTime, setFetchTime] = useState<Date>()
  const [refreshing, setRefreshing] = useState(false)

  const prevWeek = usePrevious(week)

  useEffect(() => {
    if (week != prevWeek) setData(undefined)
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

const App = connect(mapState, mapDispatch)(_App)

type BodyProps = {
  data?: Item[]
}

function _Body({ data }: BodyProps) {
  return (
    <View style={styles.cards}>
      {!!data &&
        data.map((item) => {
          const key = item.team1Name + item.team2Name
          return <Card key={key} item={item} />
        })}
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
