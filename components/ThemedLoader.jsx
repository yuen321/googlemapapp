import { ActivityIndicator, Dimensions, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import ThemedView from './ThemedView'
import { Colors } from '../constants/Colors'

const ThemedLoader = () => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light
  return (
    <ThemedView style={styles.overlay}>
      <ActivityIndicator size='large' color={theme.textColor}/>
    </ThemedView>
  )
}

export default ThemedLoader

const styles = StyleSheet.create({
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
})