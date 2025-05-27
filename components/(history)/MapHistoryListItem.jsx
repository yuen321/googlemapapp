import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ThemedText from '../ThemedText'
import ThemedButton from '../ThemedButton'
import { useThemedColor } from '../../utils/ThemedColor'
import { Ionicons } from '@expo/vector-icons'

const MapHistoryListItem = ({data, handleSelection = () => {},  handleDeletion= () => {}, enableDeletion = false}) => {
  const theme = useThemedColor()
  const {id, name, description} = data 
  if(name && description){
    return (
      <TouchableOpacity style={[styles.container, {backgroundColor: theme.uiBackground }]} onPress={() => handleSelection(data)}>
        <View style={styles.info}>
          <ThemedText title numberOfLines = {1} ellipsizeMode ='tail'>{name}</ThemedText>
          <ThemedText numberOfLines = {2} ellipsizeMode ='tail'>{description}</ThemedText>
        </View>
        {enableDeletion && <ThemedButton style={[{backgroundColor: 'transparent'}, styles.deleteButton]} onPress={() => handleDeletion(id)}>
          <Ionicons name="trash" size={24} color={theme.iconColor} />
        </ThemedButton>
       }
      </TouchableOpacity>
    )
  }
}

export default MapHistoryListItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 8,
    marginVertical: 6,
    marginHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
    height: 70
  },
  info: {
    flex: 1,
    paddingRight: 10,
    backgroundColor: 'transparent',
    alignContent: 'space-evenly'
  },
  deleteButton: {
    padding: 8,
    borderRadius: 6,
  },
})