import { Marker } from 'react-native-maps'

import PinIcon from '../../assets/icons/custom_pin.png'

const ThemedMarker = ({latitude, longitude, styles, ...props}) => {
  if(latitude == null || longitude == null) return
  return (
    <Marker
    coordinate={{latitude: latitude, longitude: longitude}}
    image={PinIcon}
    {...props}
    />
  )
}

export default ThemedMarker