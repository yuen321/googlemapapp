import { StyleSheet, View } from 'react-native'
import React, { useRef } from 'react'
import { GooglePlacesTextInputRef } from 'react-native-google-places-textinput'
import { GOOGLE_PLACES_API_KEY, setLocatonName } from '../../state/mapSlice'
import { useSelector } from 'react-redux'
import ThemedView from '../ThemedView'

const GooglePlacesAutocomplete = ({handlePlaceSelect = () => {}}) => {
  const locationName = useSelector((state) => state.map.location?.name)
  const inputRef = useRef(null)

  const onPlaceSelect = (place) => {
    if(!place) return 
    const name = place?.structuredFormat?.mainText?.text ?? ""
    const description = place?.structuredFormat?.secondaryText?.text ?? ""
    const placeId = place?.placeId 
    if(!placeId){
      console.warn("Place ID is empty from selected location", locationName)
      return
    }
    handlePlaceSelect({name, description}, placeId)
  };

  return (
   <ThemedView style={styles.container}>
    <GooglePlacesTextInputRef
    inputRef = {inputRef}
    apiKey={GOOGLE_PLACES_API_KEY}
    onPlaceSelect={onPlaceSelect}
    style={{
      container: styles.inputContainer,
      input: styles.textInput,
      suggestionsContainer : styles.suggestionsContainer
    }}
    placeHolderText="Search"
    minCharsToFetch={3}
    value={locationName}
    onTextChange={setLocatonName}
    />
   </ThemedView>
  )
}

export default GooglePlacesAutocomplete

const styles =  StyleSheet.create({
  container: {
    width:'100%',
    height: '100%',
    backgroundColor: 'transparent',
    position: 'absolute',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    height: 47,
    borderRadius: 25,
    paddingLeft: 25,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    fontSize: 17
  },
  inputContainer:{
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
  },
  suggestionsContainer: {
    backgroundColor: 'white',
    maxHeight: 300,
  },
})
