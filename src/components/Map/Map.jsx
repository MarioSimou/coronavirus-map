import React from 'react'
import {
  Map,
  TileLayer,
  CircleMarker,
  ScaleControl,
} from 'react-leaflet'
import 'src/components/Map/Map.module.css'
import Label from 'src/components/Label/Label.jsx'
import Legend from 'src/components/Legend/Legend.jsx'
import LegendField from 'src/components/LegendField/LegendField.jsx'
import axios from 'axios'
import httpClient from 'src/utils/httpClient.js'
import {
  handleFetchData,
  handleOnViewportChange,
  handleMarkerFillColor,
  handleOnClickMarker,
  handleOnMouseOutMarker,
  handleOnMouseoverMarker,
  getEventMap
} from 'src/components/Map/utils.js'
import config from 'src/utils/config.json'
import 'typeface-shojumaru'
import 'typeface-roboto'

const legendPalette = config.legends[0]
const fetchData = handleFetchData({httpClient, url: config.countriesEndpoint})
const onClickMarker = handleOnClickMarker({getEventMap})
const onMouseOverMarker = handleOnMouseoverMarker(config.circleMarker.style.highlight)
const onMouseOutMarker = handleOnMouseOutMarker(config.circleMarker.style.default)
const onViewportChange = handleOnViewportChange()
const getMarkerFillColor = handleMarkerFillColor(config.legends[0])
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
    <Map id="map" viewport={config.viewport} useFlyTo={false} onViewportChange={onViewportChange({setRadius, radius: initRadius})}>
      <div className="header">
        <h1><a href="https://coredatascience.herokuapp.com" target="_blank">Coronavirus Map</a></h1>
      </div>
      <TileLayer {...config.basemap}/>
      {countries.length > 0 && countries.map(country => {
        return <CircleMarker key={country.country} 
                             center={[country.countryInfo.lat, country.countryInfo.long]} 
                             radius={radius} 
                             onMouseOver={onMouseOverMarker({setLabel, country})}
                             onMouseOut={onMouseOutMarker({setLabel})}
                             onClick={onClickMarker}
                             fillColor={getMarkerFillColor(country.todayCases || 0)}
                             {...config.circleMarker.style.default}/>
      })}
      <ScaleControl position="bottomleft" maxWidth={300} />
      {showLabel && <Label top={label.y} left={label.x} options={label.country}/>}
      {showLegend && <Legend position="bottomRight" fields={[
        ["seventh", ()=> <LegendField color={legendPalette[0].color} start={legendPalette[0].value} sep={() => "+"}/>],
        ["sixth", ()=> <LegendField color={legendPalette[1].color} start={legendPalette[0].value} end={legendPalette[1].value} />],
        ["fifth", ()=> <LegendField color={legendPalette[2].color} start={legendPalette[1].value} end={legendPalette[2].value} />],
        ["forth", ()=> <LegendField color={legendPalette[3].color} start={legendPalette[2].value} end={legendPalette[3].value} />],
        ["third", ()=> <LegendField color={legendPalette[4].color} start={legendPalette[3].value} end={legendPalette[4].value} />],
        ["second",()=> <LegendField color={legendPalette[5].color} start={legendPalette[4].value} end={legendPalette[5].value} />],
        ["first", ()=> <LegendField color={legendPalette[6].color} start={legendPalette[5].value} end={0} />],
      ]}/>}
    </Map>
  )
}

export default CoronovirusMap