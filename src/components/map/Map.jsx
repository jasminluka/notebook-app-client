import { useState } from 'react'
import { useSelector } from 'react-redux'
import GoogleMapReact from 'google-map-react'

import Marker from './Marker'
import Info from './Info'

const Map = ({ center, zoom }) => {
  const [markerInfo, setMarkerInfo] = useState(null)
  const { notes } = useSelector(state => state.notes)

  const markers = notes?.map(note => {
    if (note?.location) {
      return (
        <Marker
          key={note._id}
          lat={note.location.coordinates[1]}
          lng={note.location.coordinates[0]}
          onClick={e => {
            e.stopPropagation()
            setMarkerInfo(note)
          }}
        />
      )
    }
    return null
  })

  return (
    <div className="map" onClick={() => setMarkerInfo(null)}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_KEY }}
        defaultCenter={center}
        defaultZoom={zoom}
      >        
        {markers}
      </GoogleMapReact>
      {
        markerInfo && <Info markerInfo={markerInfo} />
      }
    </div>
  )
}

Map.defaultProps = {
  center: {
    lat: 51.1657,
    lng: 10.4515
  },
  zoom: 4
}

export default Map