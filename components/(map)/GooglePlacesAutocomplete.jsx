import { StyleSheet, View } from 'react-native'
import React, { useRef } from 'react'
import { GooglePlacesTextInputRef } from 'react-native-google-places-textinput'
import { setLocatonName } from '../../state/mapSlice'
import { useSelector } from 'react-redux'
import { useThemedColor } from '../../utils/ThemedColor'
import t from '../../locales'

const GooglePlacesAutocomplete = ({handlePlaceSelect = () => {}}) => {
  const theme = useThemedColor()
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
   <View style={styles.container}>
    <GooglePlacesTextInputRef
    inputRef = {inputRef}
    apiKey={process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY}
    onPlaceSelect={onPlaceSelect}
    style={{
      container: styles.inputContainer,
      input: [styles.textInput, 
        {
          color: theme.text,
          backgroundColor: theme.uiBackground,
          borderColor: theme.border,
          shadowColor: theme.shadow
        }
      ],
      suggestionsContainer : [
        styles.suggestionsContainer, 
        {
          backgroundColor: theme.background
        }
      ]
    }}
    placeHolderText={t.search}
    minCharsToFetch={3}
    value={locationName}
    onTextChange={setLocatonName}
    />
   </View>
  )
}

export default GooglePlacesAutocomplete

const styles =  StyleSheet.create({
  container: {
    width:'100%',
    height: '100%',
    backgroundColor: 'transparent',
    position: 'absolute',
    marginTop: 10,
  },
  textInput: {
    borderWidth: 1,
    height: 47,
    borderRadius: 25,
    paddingLeft: 25,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    fontSize: 17,
  },
  inputContainer:{
    width: '100%',
    height: '100%',
    paddingHorizontal: 16
  },
  suggestionsContainer: {
    maxHeight: 300,
  },
})
