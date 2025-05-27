import { StatusBar} from 'react-native'
import { Provider } from 'react-redux'
import { store } from '../store/store'
import { Stack } from 'expo-router'
import { SQLiteProvider } from 'expo-sqlite'
import { DATABASE_NAME, MapProvider, migrateDbIfNeeded } from '../contexts/MapContext'
import { useThemedColor } from '../utils/ThemedColor'

const RootLayout = () => {
  const theme = useThemedColor()

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
            <Stack.Screen name='(map)' options={{title: "Search Location", headerShown: false}}/>
        </Stack>
      </Provider>
    </MapProvider>
    </SQLiteProvider>
  )
}

export default RootLayout