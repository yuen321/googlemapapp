import { router, useFocusEffect } from "expo-router"
import { useCallback, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { StyleSheet, View } from "react-native"
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"
import { setShowInfo } from "../../state/mapSlice"
import ThemedTextAutocomple from "./ThemedTextAutocomple"
import ThemedMarker from "./ThemedMarker"

export default function ThemedGoogleMapView() {
  const dispatch = useDispatch()
  const mapRef = useRef()

  const {location, markerCoordinate, mapPosition} = useSelector((state) => state.map)
  const {longitude, latitude} = markerCoordinate

  useFocusEffect(useCallback(() => {
    if(mapRef.current && mapPosition.latitude && mapPosition.longitude){
      mapRef.current?.animateToRegion(mapPosition, 1000)
    }
  },[mapPosition.latitude, mapPosition.longitude]))
  

  const navigateSearchLocation = () => {
    router.push("/searchScreen")
  }

  const onMarkerPress = useCallback(() => {
    dispatch(setShowInfo(true))
  }, []);

  return (
    <View style={styles.container}>
      <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={mapPosition}
      showsUserLocation={true}
      >
       <ThemedTextAutocomple safe text={location?.name} handleOnPress={navigateSearchLocation}/>
      
       <ThemedMarker
        onPress= {onMarkerPress}
        latitude={latitude} 
        longitude = {longitude} 
        />
    </MapView>
    </View>
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