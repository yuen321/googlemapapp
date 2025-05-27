import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native'
import { Provider } from 'react-redux'
import { store } from '../store/store'
import { Stack } from 'expo-router'
import { SQLiteProvider } from 'expo-sqlite'
import { DATABASE_NAME, MapProvider, migrateDbIfNeeded } from '../contexts/MapContext'
import { Colors } from '../constants/Colors'

const RootLayout = () => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light

  return (
    <SQLiteProvider 
    databaseName={DATABASE_NAME}
    onInit={migrateDbIfNeeded}
    useSuspense
    >
    <MapProvider>
      <Provider store={store}>
        <StatusBar value="auto"/>
        <Stack screenOptions={{
              headerStyle:{backgroundColor: theme.navBackground},
              headerTintColor: theme.title
          }}>
            <Stack.Screen name="index" options={{title: "Map ", headerShown: false}}/>
            <Stack.Screen name='(map)' options={{title: "Search Location", headerShown: false}}/>
        </Stack>
      </Provider>
    </MapProvider>
    </SQLiteProvider>
  )
}

export default RootLayout