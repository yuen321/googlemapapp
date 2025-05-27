import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import ThemedButton from '../ThemedButton'

const ThemedTextAutocomple = ({text, handleOnPress = () => {}}) => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light
  const textColor = text ? theme.title : theme.text
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.searchBoxField} onPress={handleOnPress}>
        <Text style={[styles.buttonLabel, {color: textColor}]}>{text ||  "Search"}</Text>
      </TouchableOpacity> 
    </View> 
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
      borderColor: '#ccc',
      backgroundColor:'white',
      height: 45,
      borderRadius: 25,
      paddingLeft: 25,
      shadowColor: '#000',
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