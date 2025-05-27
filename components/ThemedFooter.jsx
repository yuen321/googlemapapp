import { StyleSheet, View } from 'react-native'
import React from 'react'
import ThemedText from './ThemedText'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import ThemedButton from './ThemedButton'

const ThemedFooter = ({text, handlePress = () => {}}) => {
    
    return (
        <View style={styles.container}>
            <ThemedButton style={styles.textContainer} onPress={handlePress}>
                <ThemedText title style={styles.text}>{text}</ThemedText>
            </ThemedButton>
        </View>
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
        marginVertical: 6,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: Colors.primary,
        fontWeight: 'bold'
    }

})