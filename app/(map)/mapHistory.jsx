import { ActivityIndicator, FlatList, RefreshControl, StyleSheet } from 'react-native'

import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import { useRouter } from 'expo-router'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import useMap from '../../hooks/useMap'
import { setLocationNameDesc, setMapPosition, setMarkerCoordinate } from '../../state/mapSlice'
import MapHistoryListItem from '../../components/(history)/MapHistoryListItem'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import MapHistoryList from '../../components/(history)/MapHistoryList'

const MapHistory = () => {
  return (
    <ThemedView>
      <MapHistoryList/>
    </ThemedView>
  )
}

export default MapHistory
