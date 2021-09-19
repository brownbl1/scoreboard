import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

export function Arrow() {
  const originalWidth = 172
  const originalHeight = 344
  const aspectRatio = originalWidth / originalHeight
  const width = 5

  return (
    <View style={[{ width, aspectRatio }, styles.adjust]}>
      <Svg
        width="100%"
        height="100%"
        fill="none"
        viewBox={`0 0 ${originalWidth} ${originalHeight}`}
      >
        <Path d="M172 172L.25 343.473V.527L172 172z" fill="#0B84DB" />
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  adjust: {
    marginLeft: -8,
    marginRight: 3,
  },
})
