import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'
import { Card } from './components/Card'
import { Header } from './components/Header'
import sample from './sample.json'

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

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <Header week={week} onWeekSelected={setWeek} />
      <View style={styles.cards}>
        {sample.map((item, i) => (
          <Card key={i} item={item} />
        ))}
      </View>
    </ScrollView>
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
    flex: 1,
    backgroundColor: '#ddd',
  },
})
