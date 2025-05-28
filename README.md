# Google Map Location Picker App
This is a React Native(Expo) application that integrates Google Maps functionality to provide location-based features. 
The app allows users to search for locations, view their search history, and manage location data. Below is a detailed description of the application's features and functionality.

# Features
1. Map Screen
-  Location Permission: The app checks for location permissions when launched.
- Current Location: if permission is granted, the app retrieves and displays user's current location on the map upon the first launch.
- Marker and Location Selection: Users can select a location on the map, which will display a marker at the selected location.
- Location Info Bottom Sheet: A bottom sheet appears with detailed information about the selected location.



2. Select Location Screen
- Search with Auto-Suggestions: Users can search for locations with auto-suggestions powered by a Google Places API.
- Recent Searches: Displays the last 5 records of recent searches for quick access.
- Save Search Locations: Automatically save searched locations to a local SQLite database for future reference.

3. Search Location History Screen
- Retrieve Search History: Retrieves all previously searched locations from the local database.
- Delete Search Records: Allows users to delete specific search records from the history.


# Local Database Structure
Location history is saved locally to preserve data across app restarts.
Stored data includes:
- id
- name
- description
- latitude
- longitude
- createdTimestamp

# Technologies Details
-  React Native: For building the mobile application.
-  Expo: For development and deployment.
-  Google Maps API: For map and location-based features.
-  SQLite: For local storage of search history.
-  Redux: For state management.
-  Expo Router: For navigation between screens.
-  Custom Theming: Dynamic theming using useThemedColor for light and dark modes.
-  Key Components
-  Map Screen: Displays the map and handles location selection.
-  Select Location Screen: Provides search functionality with auto-suggestions and recent searches.
-  Search Location History Screen: Manages and displays the user's search history.
-  Folder Structure


#  Getting Started

1. update GOOGLE_PLACE_API_KEY in .env file EXPO_PUBLIC_GOOGLE_PLACES_API_KEY={YOU_API_VALUE_HERE}
2. Install Dependencies by executing :npm install
3. Start the Expo Project:  npx expo start
4. Scan QR code with Expo Go on your mobile device or an Android/iOS emulator.





https://github.com/user-attachments/assets/df302e35-565e-4581-974c-c2696f8d7ea7


