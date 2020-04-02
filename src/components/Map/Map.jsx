import React from 'react'
import {
  Map,
  TileLayer,
  CircleMarker,
  GeoJSON,
  Circle,
} from 'react-leaflet'
import 'src/components/Map/Map.module.css'
import axios from 'axios'
import httpClient from 'src/utils/httpClient.js'
import {
  handleFetchData,
} from 'src/components/Map/utils.js'

const fetchData = handleFetchData({httpClient, url: "https://corona.lmao.ninja/countries"})
const getEventMap = e => e.sourceTarget._map
const onViewportChange = ({setRadius}) => ({zoom}) => setRadius(100 * (zoom/24))
const onClickCircleMarker = e => getEventMap(e).setView(e.target.getLatLng(), 6)
const onMouseOverCircleMarker = ({target}) => {
  target.bringToFront()
  target.setStyle({
    weight: 2,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.7
  })
}
const onMouseOutCircleMarker = ({target}) => {
  target.setStyle({
    weight: 1,
    opacity: 1,
    color: 'white',
    dashArray: 2,
    fillOpacity: 0.7,
  })
}
const getColor = cases => {
  return cases > 1000 ? '#800026' :
         cases > 500  ? '#BD0026' :
         cases > 200  ? '#E31A1C' :
         cases > 100  ? '#FC4E2A' :
         cases > 50   ? '#FD8D3C' :
         cases > 20   ? '#FEB24C' :
         cases > 10   ? '#FED976' :
                        '#FFEDA0';
}

const CoronovirusMap = () => {
  const [countries, setCountries] = React.useState([])
  const [radius, setRadius ] = React.useState(10)

  React.useEffect(() => {
    const source = axios.CancelToken.source()
    fetchData({token: source.token,  setCountries})
    return () => source.cancel()
  },[])

  return (
    <Map id="map" center={[0,0]} zoom={2} useFlyTo={false} onViewportChange={onViewportChange({setRadius})} >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
      />
      {countries.length > 0 && countries.map(country => {
        return <CircleMarker key={country.country} 
                             center={[country.countryInfo.lat, country.countryInfo.long]} 
                             radius={radius} 
                             onMouseOver={onMouseOverCircleMarker}
                             onMouseOut={onMouseOutCircleMarker}
                             onClick={onClickCircleMarker}
                             weight={1}
                             opacity={1}
                             color="white"
                             dashArray={2}
                             fillOpacity={0.7}
                             fillColor={getColor(country.todayCases || 0)}/>
      })}
    </Map>
  )
}

export default CoronovirusMap