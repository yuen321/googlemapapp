import { StyleSheet, TextInput } from 'react-native'
import { useThemedColor } from '../utils/ThemedColor'

const ThemedTextInput = ({style, ...props}) => {
  const theme = useThemedColor()

  return (
    <TextInput
    style={[{backgroundColor: theme.uiBackground, color: theme.text}, styles.text, style]}
    {...props}
    />
  )
}

export default ThemedTextInput

const styles = StyleSheet.create({
    text: {
        padding: 20,
        borderRadius: 6
    }
})