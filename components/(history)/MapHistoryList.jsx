import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import useMap from '../../hooks/useMap'
import { Colors } from '../../constants/Colors'
import MapHistoryListItem from './MapHistoryListItem'
import ThemedText from '../ThemedText'
import { useDispatch } from 'react-redux'
import { setLocationNameDesc, setMarkerCoordinate, setMapPosition } from '../../state/mapSlice'
import { router } from 'expo-router'

const MapHistoryList = ({numOfRecords = 0, enablePullToRefresh = true, enableDeletion= false}) => {
    const dispatch = useDispatch()
    const{map, fetchMapHistory, deleteMapHistory} = useMap()
    const[isLoading] = useState(false)

    useEffect(() => {
      fetchMapHistory(numOfRecords)
    }, [])
  
    const handleDeletion = (id) => {
      try{
        deleteMapHistory(id)
      }catch(error){
        console.error("handleDeletion", error.message)
      }
    }

    const handleSelection = (item) => {
      try{
        const{name, description, latitude, longitude} = item
        dispatch(setMarkerCoordinate({latitude, longitude}))
        dispatch(setLocationNameDesc({name, description}))
        dispatch(setMapPosition({latitude, longitude}))
        router.replace({ pathname: '/', params: {skipInitialize: true}})
        
      }catch(error){
        console.error("handleSelection", error.message)
      }
    }
  
    if(isLoading){
      <ActivityIndicator size='large' color={Colors.primary}/>
    }
    return (
        <FlatList
        refreshControl = { enablePullToRefresh &&
          <RefreshControl refreshing={isLoading} onRefresh={fetchMapHistory} tintColor={Colors.primary}/>
        }
        data = {map}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <MapHistoryListItem 
          data={item} 
          handleSelection={handleSelection}
          handleDeletion={handleDeletion}
          enableDeletion={enableDeletion}
          />
        )}
        ListEmptyComponent={<ThemedText>No result found</ThemedText>}
        /> 
    )
  }
  
  export default MapHistoryList
  