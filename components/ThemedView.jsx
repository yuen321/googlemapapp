import { View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useThemedColor } from '../utils/ThemedColor'

const ThemedView = ({ style, safe=false, ...props}) => {
  const theme = useThemedColor()
  
  if(!safe)return (
    <View 
    style={[{backgroundColor: theme.background}, style]} 
    {...props}
    />
  )

  return (
    <SafeAreaView 
    style={[{backgroundColor: theme.background}, style]} 
    {...props}
    />
  )
}

export default ThemedView
