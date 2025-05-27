import { useLocalSearchParams } from "expo-router"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { StyleSheet } from "react-native"
import ThemedView from "../../components/ThemedView"
import { requestCurrentLocation} from "../../state/mapSlice"
import ThemedBottomSheet from "../../components/(map)/ThemedBottomSheet"
import ThemedGoogleMapView from "../../components/(map)/ThemedGoogleMapView"

export default function GoogleMapScreen() {
  const dispatch = useDispatch()
  const {skipInitialize} = useLocalSearchParams()

  useEffect(() => {
    if(!skipInitialize){
      dispatch(requestCurrentLocation())
    }
  }, [])
  
  return (
    <ThemedView style={styles.container}>
     <ThemedBottomSheet>
        <ThemedGoogleMapView />
     </ThemedBottomSheet>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignContent: 'stretch'
  },
  map: {
      width: '100%',
      height: '100%'
  }
})