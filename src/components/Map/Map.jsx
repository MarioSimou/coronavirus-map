import React from 'react'

import 'src/components/Map/Map.module.css'
import Label from 'src/components/Label/Label.jsx'
import Legend from 'src/components/Legend/Legend.jsx'
import LegendField from 'src/components/LegendField/LegendField.jsx'
import {
  Map,
  TileLayer,
  CircleMarker,
  ScaleControl,
  ZoomControl,
  FeatureGroup,
} from 'react-leaflet'
import {
  handleFetchData,
  handleOnViewportChange,
  handleMarkerFillColor,
  handleOnClickMarker,
  handleOnMouseOutMarker,
  handleOnMouseoverMarker,
  handleOnAddFeatureGroup,
  getEventMap
} from 'src/components/Map/utils.js'
import config from 'src/utils/config.json'
import axios from 'axios'
import httpClient from 'src/utils/httpClient.js'
import mapIcon from 'src/public/img/map.png'

const legendPalette = config.legends[0]
const fetchData = handleFetchData({httpClient, url: config.countriesEndpoint})
const onClickMarker = handleOnClickMarker({getEventMap})
const onMouseOverMarker = handleOnMouseoverMarker(config.circleMarker.style.highlight)
const onMouseOutMarker = handleOnMouseOutMarker(config.circleMarker.style.default)
const onViewportChange = handleOnViewportChange()
const getMarkerFillColor = handleMarkerFillColor(config.legends[0])
const onAddFeatureGroup = handleOnAddFeatureGroup({getEventMap})
const initRadius = 12


const CoronovirusMap = () => {
  const [countries, setCountries] = React.useState([])
  const [radius, setRadius ] = React.useState(initRadius)
  const [label, setLabel] = React.useState({})
  const showLabel = Object.values(label).length > 0
  const showLegend = countries.length > 0 

  React.useEffect(() => {
    const source = axios.CancelToken.source()
    fetchData({token: source.token,  setCountries})
    return () => source.cancel()
  },[])

  return (
    <Map id="map" 
         className="map" 
         zoomControl={false}
         attributionControl={false}
         useFlyTo={true}
         onViewportChange={onViewportChange({setRadius, radius: initRadius})}
         {...config.map}>
      <div className="header">
        <h1>
          <a href="https://coredatascience.herokuapp.com" target="_blank">
            Coronavirus Map
          </a>
        </h1>
      </div>
      <TileLayer {...config.basemap}/>
      {countries.length > 0 && 
      <FeatureGroup onadd={onAddFeatureGroup}>
        {countries.map(country => {
          return <CircleMarker key={country.country} 
                              center={[country.countryInfo.lat, country.countryInfo.long]} 
                              radius={radius} 
                              onMouseOver={onMouseOverMarker({setLabel, country})}
                              onMouseOut={onMouseOutMarker({setLabel})}
                              onClick={onClickMarker}
                              fillColor={getMarkerFillColor(country.todayCases || 0)}
                              {...config.circleMarker.style.default}/>
        })}  
      </FeatureGroup>}
      <ZoomControl position="topright" />
      <ScaleControl position="bottomright" maxWidth={300} />
      {showLabel && <Label top={label.y} left={label.x} options={label.country}/>}
      {showLegend && <Legend position="bottomleft" fields={[
        ["seventh", ()=> <LegendField color={legendPalette[0].color} start={legendPalette[0].value} sep={() => "+"}/>],
        ["sixth", ()=> <LegendField color={legendPalette[1].color} start={legendPalette[1].value} end={legendPalette[0].value} />],
        ["fifth", ()=> <LegendField color={legendPalette[2].color} start={legendPalette[2].value} end={legendPalette[1].value} />],
        ["forth", ()=> <LegendField color={legendPalette[3].color} start={legendPalette[3].value} end={legendPalette[2].value} />],
        ["third", ()=> <LegendField color={legendPalette[4].color} start={legendPalette[4].value} end={legendPalette[3].value} />],
        ["second",()=> <LegendField color={legendPalette[5].color} start={legendPalette[5].value} end={legendPalette[4].value} />],
        ["first", ()=> <LegendField color={legendPalette[6].color} start={0} end={legendPalette[5].value} />],
      ]}/>}
    </Map>
  )
}

export default CoronovirusMap