import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Dimensions } from "react-native"
import * as Location from 'expo-location'

const {width, height} = Dimensions.get("window")
const ASPECT_RATIO = width/ height
const INITIAL_LATITUDE_DELTA = 0.02
const INITIAL_LONGITUDE_DELTA = INITIAL_LATITUDE_DELTA * ASPECT_RATIO

const initialState = {
    location: {
        name: '',
        description: '',
    },
    markerCoordinate: {},
    mapPosition: {},
    shouldUpsertLocation: false,
    isLoading: false,
    currentLocation: {},
    error: null
}

export const GOOGLE_PLACES_API_KEY = 'AIzaSyALED7L_auA5XwkOSlVamOnQfr2Sdd8528'
const GOOGLE_BASE_URL = "https://maps.googleapis.com/maps/api/place"
const PARAM_PLACE_ID = "placeid"
const PARAM_KEY = "key"
const STATUS_OK= "OK"
const STATUS_ERROR= "Error"

const mapSlice = createSlice({
    name: "map",
    initialState,
    reducers : {
        setShouldUpsertLocation: (state, action) => {
            state.shouldUpsertLocation = action.payload
        },
        setLocationNameDesc: (state, action) => {
            state.location = action.payload
        },
        setMarkerCoordinate:(state, action) => {
            const{latitude, longitude} = action.payload
            state.markerCoordinate = {latitude, longitude}
        },
        setMapPosition: (state, action) => {
            const {latitude, longitude} = action.payload
            state.mapPosition = {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: INITIAL_LATITUDE_DELTA,
                longitudeDelta: INITIAL_LONGITUDE_DELTA
            }
        },
        setLoading:(state, action) => {
            state.isLoading = action.payload
        }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(getPlaceDetailById.pending, () => {
            console.log("getPlaceDetailById pending")
        })
        .addCase(getPlaceDetailById.fulfilled, (state, action) => {
            console.log("getPlaceDetailById fulfilled", action.payload)
            state.markerCoordinate = action.payload
            state.mapPosition.latitude = action.payload.latitude
            state.mapPosition.longitude = action.payload.longitude
            state.shouldUpsertLocation = true
        })
        .addCase(getPlaceDetailById.rejected, (state, action) => {
            console.log("getPlaceDetailById rejected", action.payload)
        })
        .addCase(requestCurrentLocation.pending, (state) => {
            console.log("requestCurrentLocation pending")
        })
        .addCase(requestCurrentLocation.fulfilled, (state, action) => {
            console.log("requestCurrentLocation fulfilled")
            const{latitude, longitude} = action.payload.coords
            state.mapPosition = {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: INITIAL_LATITUDE_DELTA,
                longitudeDelta: INITIAL_LONGITUDE_DELTA
            }
            state.currentLocation = {latitude, longitude}
        })
        .addCase(requestCurrentLocation.rejected, (state, action) => {
            console.log("requestCurrentLocation failed", action.payload)
            state.mapPosition = {
            }
        })
        .addCase(delayCallback.fulfilled, (state, action) => {
            console.log("delayCallback fulfilled", action.payload)
        })
    }
})

export const getPlaceDetailById = createAsyncThunk(
    "map/getPlaceDetailById", 
    async(placeId, {rejectWithValue}) => {
    const urlGooglePlaceDetail = new URL("https://maps.googleapis.com/maps/api/place/details/json?placeid=?&key=?")
    if(placeId){
        urlGooglePlaceDetail.searchParams.set(PARAM_PLACE_ID, placeId)
        urlGooglePlaceDetail.searchParams.set(PARAM_KEY, GOOGLE_PLACES_API_KEY)
    }
    try {
        const response = await fetch(urlGooglePlaceDetail);
        const data = await response.json()
        if (data.status === STATUS_OK) {
          const location = data?.result?.geometry?.location
          const {lat, lng} = location
          if(lat && lng){
            return {latitude: lat, longitude: lng}
          }
        } else {
          console.error('Google Maps API error:', data.status)
          return rejectWithValue(data.status)
        }
    } catch (error) {
        console.error('Fetch error:', error.message)
        return rejectWithValue(error.message)
    }
})

export const requestCurrentLocation = createAsyncThunk(
    "location/requestCurrentLocation",
    async(_, {rejectWithValue}) => {
        const {status} = await Location.requestForegroundPermissionsAsync()
        console.log("status", status)
        if(status !== "granted"){
            return rejectWithValue("location permission is not granted")
        }
        const location = await Location.getCurrentPositionAsync({})
        return location
    }
)

export const delayCallback= createAsyncThunk(
    "map/setCountdownDelay",
    async(second) => {
        await new Promise((resolve) => setTimeout(resolve, 1000 * second))
        return true
    }
)

export const {setLocationNameDesc, setInitialMapPosition, setMarkerCoordinate, setShouldUpsertLocation, setMapPosition, setLoading} = mapSlice.actions

export default mapSlice.reducer
