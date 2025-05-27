import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ThemedView from '../../components/ThemedView'
import GooglePlacesAutocomplete from '../../components/(map)/GooglePlacesAutocomplete'
import { useDispatch, useSelector } from 'react-redux'
import { setLocationNameDesc, getPlaceDetailById, setShouldUpsertLocation, delayCallback, setLoading, setShowInfo} from '../../state/mapSlice'
import { router } from 'expo-router'
import useMap from '../../hooks/useMap'
import ThemedFooter from '../../components/ThemedFooter'
import Spacer from '../../components/Spacer'
import ThemedLoader from '../../components/ThemedLoader'
import MapHistoryList from '../../components/(history)/MapHistoryList'

const SearchScreen = () => {
  const {location, markerCoordinate, shouldUpsertLocation, isLoading} = useSelector((state) => state.map)
  const dispatch = useDispatch()
  const {upsertMapHistory} = useMap()
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);


  const handlePlaceSelect = (location, placeId) => {
    if(!placeId){
      console.warn("Place ID is empty from selected location", location.name)
      return
    }
    try{
      dispatch(setLocationNameDesc(location))
      dispatch(getPlaceDetailById(placeId))
    }catch(error){
      console.error("handlePlaceSelect", error.message)
    }
  }

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
  
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });
  
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    const updateLocation = async() => {
      try{
        if(shouldUpsertLocation === true) {
          upsertMapHistory({ ...location, ...markerCoordinate})
          dispatch(setLoading(true))
          await dispatch(delayCallback(0.5)).unwrap()
          dispatch(setShouldUpsertLocation(false))
          dispatch(setLoading(false))
          dispatch(setShowInfo(true))
          router.back()
        }
      }catch(error){
        console.error("shouldUpsertLocation", error.message)
      }
    }
    updateLocation()
  }, [shouldUpsertLocation])

  const navigateToMapHistory = () => {
    router.push("/mapHistory")
  }
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        {isLoading && <ThemedLoader/>}
        <View style={styles.content}>
          <GooglePlacesAutocomplete handlePlaceSelect={handlePlaceSelect}/>
          <Spacer height={70}/>
          {
            !isKeyboardVisible &&  <MapHistoryList enablePullToRefresh={false} numOfRecords={5} scrollEnabled={false}/>
          }
        </View>
        <ThemedFooter text="More from recent history" handlePress={navigateToMapHistory}/>
      </ThemedView>
    </TouchableWithoutFeedback>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 5
  }
})