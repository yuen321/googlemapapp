import { router, useFocusEffect, useLocalSearchParams } from "expo-router"
import { useCallback, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { StyleSheet } from "react-native"
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"
import ThemedView from "../../components/ThemedView"
import { requestCurrentLocation} from "../../state/mapSlice"
import ThemedTextAutocomple from "../../components/(map)/ThemedTextAutocomple"
import ThemedMarker from "../../components/(map)/ThemedMarker"

export default function GoogleMapScreen() {
  const dispatch = useDispatch()
  const mapRef = useRef()

  const {skipInitialize} = useLocalSearchParams()
  const {location, markerCoordinate, mapPosition} = useSelector((state) => state.map)
  const {longitude, latitude} = markerCoordinate

  useEffect(() => {
    if(!skipInitialize){
      dispatch(requestCurrentLocation())
    }
  }, [])

  useFocusEffect(useCallback(() => {
    if(mapRef.current && mapPosition.latitude && mapPosition.longitude){
      // mapRef.current?.animateCamera({center:markerCoordinate, zoom: 15}, {duration: 15})
      mapRef.current?.animateToRegion(mapPosition, 1000)
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
      showsUserLocation={true}
      >
       <ThemedTextAutocomple safe text={location?.name} handleOnPress={navigateSearchLocation}/>
      
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