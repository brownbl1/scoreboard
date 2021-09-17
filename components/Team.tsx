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
        <View style={{ height: 30, width: 30 }}>
          <SvgUri width="30" height="30" uri={props.img} />
        </View>
        <Text numberOfLines={1} style={styles.name}>
          {props.name}
        </Text>
        <Text style={styles.record}>{props.record}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 3,
  },

  name: {
    display: 'flex',
    flexShrink: 1,
    paddingLeft: 5,
    paddingRight: 2,
    fontWeight: 'bold',
  },
  record: {
    display: 'flex',
    fontSize: 12,
    color: 'gray',
  },
})
