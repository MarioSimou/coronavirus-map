import React from 'react'
import {
  Map,
  TileLayer,
  CircleMarker,
  ScaleControl,
  Popup,
} from 'react-leaflet'
import 'src/components/Map/Map.module.css'
import Label from 'src/components/Label/Label.jsx'
import axios from 'axios'
import httpClient from 'src/utils/httpClient.js'
import {
  handleFetchData,
  handleOnViewportChange,
  getCircleMarkerFillColor,
  handleOnClickMarker,
  handleOnMouseOutMarker,
  handleOnMouseoverMarker,
  getEventMap
} from 'src/components/Map/utils.js'
import config from 'src/utils/config.json'

const fetchData = handleFetchData({httpClient, url: config.countriesEndpoint})
const onClickMarker = handleOnClickMarker({getEventMap})
const onMouseOverMarker = handleOnMouseoverMarker(config.circleMarker.style.highlight)
const onMouseOutMarker = handleOnMouseOutMarker(config.circleMarker.style.default)
const onViewportChange = handleOnViewportChange()


const CoronovirusMap = () => {
  const [countries, setCountries] = React.useState([])
  const [radius, setRadius ] = React.useState(10)
  const [label, setLabel] = React.useState({})

  React.useEffect(() => {
    const source = axios.CancelToken.source()
    fetchData({token: source.token,  setCountries})
    return () => source.cancel()
  },[])

  return (
    <Map id="map" viewport={config.viewport} useFlyTo={false} onViewportChange={onViewportChange({setRadius})}>
      <TileLayer {...config.basemap}/>
      {countries.length > 0 && countries.map(country => {
        return <CircleMarker key={country.country} 
                             center={[country.countryInfo.lat, country.countryInfo.long]} 
                             radius={radius} 
                             onMouseOver={onMouseOverMarker({setLabel, country})}
                             onMouseOut={onMouseOutMarker({setLabel})}
                             onClick={onClickMarker}
                             fillColor={getCircleMarkerFillColor(country.todayCases || 0)}
                             {...config.circleMarker.style.default}/>
      })}
      <ScaleControl position="bottomleft" maxWidth={350} />
      {Object.values(label).length > 0 && <Label top={label.y} left={label.x} options={label.country}/>}
    </Map>
  )
}

export default CoronovirusMap