import { Link, useFocusEffect, useLocalSearchParams, useRouter } from "expo-router"
import { useCallback, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setInitialMapPosition } from "../state/mapSlice"
import { StyleSheet, View } from "react-native"
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"
import ThemedTextAutocomple from "../components/(map)/ThemedTextAutocomple"
import ThemedMarker from "../components/(map)/ThemedMarker"
import ThemedView from "../components/ThemedView"

export default function GoogleMapScreen() {
  const router = useRouter()
  const dispatch = useDispatch()
  const mapRef = useRef()

  const {skipInitialize} = useLocalSearchParams()
  const {location, markerCoordinate, mapPosition} = useSelector((state) => state.map)
  const {longitude, latitude} = markerCoordinate

  useEffect(() => {
    if(!skipInitialize){
      dispatch(setInitialMapPosition())
    }
  }, [])


  useFocusEffect(useCallback(() => {
    if(mapRef.current && mapPosition.latitude && mapPosition.longitude){
      mapRef.current?.animateCamera({center:markerCoordinate, zoom: 15}, {duration: 15})
    }
  },[mapPosition.latitude, mapPosition.longitude]))
  
  const navigateSearchLocation = () => {
    router.push("/searchScreen")
  }
  
  return (
    <ThemedView style={styles.container}>
      <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={mapPosition}
      >
        <ThemedTextAutocomple text={location?.name} handleOnPress={navigateSearchLocation}/>
        <ThemedMarker
        latitude={latitude} 
        longitude = {longitude} 
        />
    </MapView>
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