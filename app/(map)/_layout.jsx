import { StatusBar } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { useThemedColor } from '../../utils/ThemedColor'

const MapLayout = () => {
  const theme = useThemedColor()
  return (
    <>
    <StatusBar value="auto"/>
    <Stack screenOptions={{
      headerShown: true, 
      animation: "default",
      headerStyle:{backgroundColor: theme.navBackground},
      headerTintColor: theme.title
    }}>
      <Stack.Screen name="index" options={{title: 'Map Screen', headerShown: false}}/>
      <Stack.Screen name="searchScreen" options={{title: "Search Location"}}/>
      <Stack.Screen name="mapHistory" options={{title: 'Recent Searches'}}/>
    </Stack>
    </>
  )
}

export default MapLayout
