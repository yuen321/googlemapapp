import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ThemedText from '../ThemedText'
import ThemedButton from '../ThemedButton'

const MapHistoryListItem = ({data, handleSelection = () => {},  handleDeletion= () => {}, enableDeletion = false}) => {
  const {id, name, description} = data 
  if(name && description){
    return (
      <TouchableOpacity style={styles.container} onPress={() => handleSelection(data)}>
        <View style={styles.info}>
          <ThemedText title numberOfLines = {1} ellipsizeMode ='tail'>{name}</ThemedText>
          <ThemedText numberOfLines = {2} ellipsizeMode ='tail'>{description}</ThemedText>
        </View>
        {enableDeletion && <ThemedButton style={styles.deleteButton} onPress={() => handleDeletion(id)}>
          {/* <Ionicons name="trash" size={24} color="white" /> */}
          <Text>Delete item</Text>
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
    backgroundColor: '#f9f9f9',
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
    backgroundColor: '#ff4d4d',
    padding: 8,
    borderRadius: 6,
  },
})