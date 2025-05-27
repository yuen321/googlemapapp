import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import ThemedView from '../ThemedView'
import { useThemedColor } from '../../utils/ThemedColor'

const ThemedTextAutocomple = ({text, handleOnPress = () => {}, safe= false}) => {
  const theme = useThemedColor()
  const textColor = text ? theme.title : theme.text
  return (
    <ThemedView safe={safe} style={styles.container}>
      <TouchableOpacity style={[styles.searchBoxField, {backgroundColor: theme.uiBackground, borderColor: theme.border, shadowColor: theme.shadow}]} onPress={handleOnPress}>
        <Text style={[styles.buttonLabel, {color: textColor}]}>{text ||  "Search"}</Text>
      </TouchableOpacity> 
    </ThemedView> 
  )
}

export default ThemedTextAutocomple

const styles = StyleSheet.create({
  container: {
        position: 'absolute',
        width: '100%',
        backgroundColor: 'transparent',
        padding: 8,
        alignSelf: 'center',
        marginTop: 10,
        justifyItems: 'stretch'
    },
    searchBoxField: {
      borderWidth: 1,
      height: 45,
      borderRadius: 25,
      paddingLeft: 25,
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
      justifyContent: 'center'
    },
    buttonLabel:{
        fontSize: 16
    },
})