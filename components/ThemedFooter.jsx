import { StyleSheet, View } from 'react-native'
import React from 'react'
import ThemedText from './ThemedText'
import ThemedButton from './ThemedButton'
import ThemedView from './ThemedView'
import { useThemedColor } from '../utils/ThemedColor'

const ThemedFooter = ({text, handlePress = () => {}}) => {
    const theme = useThemedColor()
    return (
        <ThemedView safe style={styles.container}>
            <ThemedButton style={styles.textContainer} onPress={handlePress}>
                <ThemedText title style={[styles.text, {color: theme.primary}]}>{text}</ThemedText>
            </ThemedButton>
        </ThemedView>
    )
}

export default ThemedFooter

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },
    textContainer: {
        width: '100%',
        backgroundColor: 'transparent',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontWeight: 'bold'
    }

})