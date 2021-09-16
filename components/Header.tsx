import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Dialog, Portal, TextInput } from 'react-native-paper'

type Props = {
  week: number
  onWeekSelected: (week: number) => void
}

export function Header({ week, onWeekSelected }: Props) {
  const [dlgVisible, setDlgVisible] = useState(false)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scoreboard - Week {week}</Text>
      <MaterialCommunityIcons
        name="calendar-week"
        size={25}
        color="black"
        onPress={() => setDlgVisible(true)}
      />
      <Portal>
        <SelectWeekDialog
          initialWeek={week}
          visible={dlgVisible}
          onDismiss={() => setDlgVisible(false)}
          onPressOk={(week) => {
            setDlgVisible(false)
            onWeekSelected(week)
          }}
        />
      </Portal>
    </View>
  )
}

type DialogProps = {
  visible: boolean
  onDismiss: () => void
  onPressOk: (week: number) => void
  initialWeek: number
}

function SelectWeekDialog({
  visible,
  onDismiss,
  onPressOk,
  initialWeek,
}: DialogProps) {
  const [week, setWeek] = useState(initialWeek.toString())

  return (
    <Dialog
      visible={visible}
      onDismiss={() => {
        onDismiss()
        setWeek(initialWeek.toString())
      }}
    >
      <Dialog.Title>Select Week</Dialog.Title>
      <Dialog.Content>
        <TextInput
          autoFocus
          value={week}
          onChangeText={setWeek}
          style={styles.input}
          dense
          placeholder="Week number"
          keyboardType="number-pad"
        />
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={() => onPressOk(parseInt(week))}>OK</Button>
      </Dialog.Actions>
    </Dialog>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
  },
})
