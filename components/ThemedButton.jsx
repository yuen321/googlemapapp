import { Pressable, StyleSheet } from 'react-native'
import { useThemedColor } from '../utils/ThemedColor'

const ThemedButton = ({style, ...props}) => {
  const theme = useThemedColor()
  return (
    <Pressable 
    style={({pressed}) => [{backgroundColor: theme.primary}, styles.btn, pressed && styles.pressed, style]}
    {...props}
    />
  )
}

export default ThemedButton

const styles = StyleSheet.create({
    btn:{
        padding: 15,
        radius: 5
    },
    pressed: {
        opacity: 0.8
    }
})