import { Text } from 'react-native'
import React from 'react'
import { useThemedColor } from '../utils/ThemedColor'

const ThemedText = ({style, title=false, ...props}) => {
  const theme = useThemedColor()
  const textColor = title ? theme.title : theme.text
  return (
    <Text 
    style={[{color: textColor}, style]} 
    {...props} 
    />
  )
}

export default ThemedText