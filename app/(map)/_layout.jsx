import { StatusBar } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const MapLayout = () => {
  return (
    <>
    <StatusBar value="auto"/>
    <Stack screenOptions={{headerShown: true, animation: "none"}}>
      <Stack.Screen name="searchScreen" options={{title: "Search Location", headerShown: false}}/>
      <Stack.Screen name="mapHistory" options={{title: 'Recent Searches'}}/>
    </Stack>
    </>
  )
}

export default MapLayout
