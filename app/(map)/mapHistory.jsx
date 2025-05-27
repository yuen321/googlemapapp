import { StyleSheet } from 'react-native'
import ThemedView from '../../components/ThemedView'
import MapHistoryList from '../../components/(history)/MapHistoryList'

const MapHistory = () => {
  return (
    <ThemedView style={styles.container}>
      <MapHistoryList enableDeletion/>
    </ThemedView>
  )
}

export default MapHistory

const styles = StyleSheet.create({
  container: {
    flex:1
  }
})
