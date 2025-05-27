import { useColorScheme } from 'react-native'
import { Colors } from '../constants/Colors'

export function useThemedColor() {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light
  return theme
}

