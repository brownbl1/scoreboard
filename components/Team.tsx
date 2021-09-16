import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SvgUri } from 'react-native-svg'

type TeamProps = {
  name: string
  img: string
  record: string
  score: string
}

export function Team(props: TeamProps) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <SvgUri width="30" height="30" uri={props.img} />
        <Text numberOfLines={1} style={styles.name}>
          {props.name}
        </Text>
        <Text style={{ fontSize: 12, color: 'gray' }}>{props.record}</Text>
      </View>
      <Text style={{ fontWeight: 'bold' }}>{props.score}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    flex: 1,
    marginRight: 3,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: { paddingHorizontal: 5, fontWeight: 'bold' },
})
