import { StatusBar } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { useThemedColor } from '../../utils/ThemedColor'
import t from '../../locales'

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
      <Stack.Screen name="index" options={{title: `${t.screen_map}`, headerShown: false}}/>
      <Stack.Screen name="searchScreen" options={{title: `${t.screen_search}`}}/>
      <Stack.Screen name="mapHistory" options={{title: `${t.screen_history}`}}/>
    </Stack>
    </>
  )
}

export default MapLayout
