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
  handleResetMarkerStyle,
  getEventMap,
  isMobile
} from 'src/components/Map/utils.js'
import config from 'src/utils/config.json'
import axios from 'axios'
import httpClient from 'src/utils/httpClient.js'

const legendPalette = config.legends[0]
const resetMarkerStyle = handleResetMarkerStyle(config.circleMarker.style.default)
const fetchData = handleFetchData({httpClient, url: config.countriesEndpoint})
const onMouseOverMarker = handleOnMouseoverMarker(config.circleMarker.style.highlight)
const onMouseOutMarker = handleOnMouseOutMarker({resetMarkerStyle})
const onClickMarkerDesktop = handleOnClickMarker({getEventMap})
const onClickMarkerMobileDevice = ({resetMarkerStyle,onMouseOverMarker}) => e => {
  resetMarkerStyle()
  onMouseOverMarker(e) 
  onClickMarkerDesktop(e)
}
const onViewportChange = handleOnViewportChange({radius: config.init.radius})
const getMarkerFillColor = handleMarkerFillColor(config.legends[0])
const onAddFeatureGroup = handleOnAddFeatureGroup({getEventMap})

const CoronovirusMap = () => {
  const [countries, setCountries] = React.useState([])
  const [radius, setRadius ] = React.useState(config.init.radius)
  const [label, setLabel] = React.useState(config.init.label)
  const showLegend = countries.length > 0
  const mobileDevice = isMobile()
  const resetLabel = () => setLabel(config.init.label)

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
         onViewportChange={onViewportChange({setRadius})}
         {...config.map}>
      <div className="header">
        <h1>
          <a href={config.cds} target="_blank">Coronavirus Map</a>
        </h1>
      </div>
      <TileLayer {...config.basemap}/>
      {countries.length > 0 && 
      <FeatureGroup onadd={onAddFeatureGroup} >
        {countries.map(country => {
          return <CircleMarker key={country.country} 
                              center={[country.countryInfo.lat, country.countryInfo.long]} 
                              radius={radius} 
                              onMouseOver={mobileDevice ? null : onMouseOverMarker({setLabel, country})}
                              onMouseOut={mobileDevice ? null : onMouseOutMarker({resetLabel})}
                              onClick={mobileDevice ? onClickMarkerMobileDevice({
                                onMouseOverMarker: onMouseOverMarker({setLabel, country}),
                                resetMarkerStyle: () =>  label.target && resetMarkerStyle(label.target)
                              }) : onClickMarkerDesktop}
                              fillColor={getMarkerFillColor(country.todayCases || 0)}
                              {...config.circleMarker.style.default}/>
        })}  
      </FeatureGroup>}
      <ZoomControl position="topleft" />
      <ScaleControl position="bottomleft" maxWidth={350} />
      <Label position={{top: 65, right: 10}} 
             options={label.country}
             defaultText={mobileDevice ? 'Select a country' : 'Hover over a country' }
             show={Object.values(label.country).length > 0}/>
      {showLegend && <Legend title="Today cases" position="bottomright" fields={[
        ["sixth", ()=> <LegendField color={legendPalette[0].color} start={legendPalette[0].value} sep={() => "+"}/>],
        ["fifth", ()=> <LegendField color={legendPalette[1].color} start={legendPalette[1].value} end={legendPalette[0].value} />],
        ["forth", ()=> <LegendField color={legendPalette[2].color} start={legendPalette[2].value} end={legendPalette[1].value} />],
        ["third", ()=> <LegendField color={legendPalette[3].color} start={legendPalette[3].value} end={legendPalette[2].value} />],
        ["second", ()=> <LegendField color={legendPalette[4].color} start={legendPalette[4].value} end={legendPalette[3].value} />],
        ["first",()=> <LegendField color={legendPalette[5].color} start={legendPalette[5].value} end={legendPalette[4].value} />]
      ]}/>}
    </Map>
  )
}

export default CoronovirusMap