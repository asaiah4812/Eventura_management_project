"use client"
import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '400px'
}

const center = {
  lat: -3.745,
  lng: -38.523
}

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
  })

  const [, setMap] = React.useState<google.maps.Map | null>(null)

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback() {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ ...containerStyle, borderRadius: '10px' }}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : <div>
    Loading...
    <div className="spinner">
      <style jsx>{`
        .spinner {
          margin: 100px auto;
          width: 40px;
          height: 40px;
          position: relative;
        }

        .double-bounce1, .double-bounce2 {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: #333;
          opacity: 0.6;
          position: absolute;
          top: 0;
          left: 0;
          animation: sk-bounce 2.0s infinite ease-in-out;
        }

        .double-bounce2 {
          animation-delay: -1.0s;
        }

        @keyframes sk-bounce {
          0%, 100% { transform: scale(0.0) }
          50% { transform: scale(1.0) }
        }
      `}</style>
      <div className="double-bounce1"></div>
      <div className="double-bounce2"></div>
    </div>
    </div>
}

export default Map
