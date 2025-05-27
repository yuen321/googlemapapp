import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Dimensions } from "react-native"

const {width, height} = Dimensions.get("window")
const ASPECT_RATIO = width/ height
const INITIAL_LATITUDE_DELTA = 0.02
const INITIAL_LONGITUDE_DELTA = INITIAL_LATITUDE_DELTA * ASPECT_RATIO
const INITIAL_LATITUDE = 28.46254 //todo update
const INITIAL_LONGITUDE = -81.397272

const initialState = {
    location: {
        name: '',
        description: '',
    },
    markerCoordinate: {
        latitude: null,
        longitude: null
    },
    mapPosition: {
        latitude: null,
        longitude: null,
        latitudeDelta: null,
        longitudeDelta: null
    },
    shouldUpsertLocation: false,
    isLoading: false
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
        setInitialMapPosition: (state) => {
            console.log("setInitialMapPosition")
            state.mapPosition = {
                latitude:  INITIAL_LATITUDE,
                longitude: INITIAL_LONGITUDE,
                latitudeDelta: INITIAL_LATITUDE_DELTA,
                longitudeDelta: INITIAL_LONGITUDE_DELTA
            }
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
        .addCase(delayCallback.fulfilled, (state, action) => {
            console.log("getPlaceDetailById fulfilled", action.payload)
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

//mock async funct
export const delayCallback= createAsyncThunk(
    "map/setCountdownDelay",
    async(second) => {
        await new Promise((resolve) => setTimeout(resolve, 1000 * second))
        return true
    }
)

export const {setLocationNameDesc, setInitialMapPosition, setMarkerCoordinate, setShouldUpsertLocation, setMapPosition, setLoading} = mapSlice.actions

export default mapSlice.reducer
