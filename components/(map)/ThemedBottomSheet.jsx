import { StyleSheet, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView, useBottomSheetSpringConfigs } from '@gorhom/bottom-sheet';
import { useDispatch, useSelector } from 'react-redux'
import { setShowInfo } from '../../state/mapSlice'
import ThemedText from '../ThemedText'
import Spacer from '../Spacer';

const ThemedBottomSheet = ({children}) => {
    const bottomSheetRef = useRef(null)
    const snapPoints = useMemo(() => ["25%", "50%"], []);
    const {location, showInfo} = useSelector((state) => state.map)
    const dispatch = useDispatch()

    const animationConfigs = useBottomSheetSpringConfigs({
        damping: 80,
        overshootClamping: true,
        restDisplacementThreshold: 0.1,
        restSpeedThreshold: 0.1,
        stiffness: 500,
    })

    const handleSheetChanges = useCallback((index) => {
        // -1 indicate bottom sheet is dismiss
        if(index == -1){
            dispatch(setShowInfo(false))
        }
    }, []);

    useEffect(() => {
        if(showInfo){
            bottomSheetRef.current?.present()
        }
    }, [showInfo]);
    

    const renderBackdrop = useCallback((props) => (
        <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior={"close"}
        />
    ), []);
    
  return ( 
    <GestureHandlerRootView style={styles.container}>
    <BottomSheetModalProvider>
    {children}
    <BottomSheetModal 
        ref={bottomSheetRef} 
        snapPoints={snapPoints}
        index={1}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        animationConfigs={animationConfigs}
        >
        <BottomSheetView style={styles.contentContainer}>
            <View>
            <ThemedText title style={styles.text}>Location Name: {location.name}</ThemedText>
            <Spacer height={16}/>
            <ThemedText style={styles.text}>{location.description || 'Location Info'}</ThemedText>
            </View>
        </BottomSheetView> 
    </BottomSheetModal>
    </BottomSheetModalProvider>    
    </GestureHandlerRootView>
  )
}

export default ThemedBottomSheet

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    contentContainer: {
      flex: 1,
      padding: 36,
      alignItems: 'stretch',
    },
    text:{
        fontSize:18,
        width: '100%'
    }
});