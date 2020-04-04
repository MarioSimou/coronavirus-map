import 'regenerator-runtime'

export const handleFetchData = ({httpClient, url}) => async ({token, setCountries, countryFeatureMap}) => {
  try {
    const { status ,data}  = await httpClient.get(url, {cancelToken: token})
    if(status === 200 ){
      setCountries(data)
    }
  }catch(e){
    console.log(e)
  }
}

export const handleMarkerFillColor = palette => cases => {
  for(const {color, value} of palette ){
    if (cases >= value) {
      return color
    } 
  }
}

export const getEventMap = e => e.sourceTarget._map

export const handleOnViewportChange = () => ({setRadius, radius}) => ({zoom}) => setRadius(radius * 12.5 * (zoom/24))

export const handleOnClickMarker = ({getEventMap}) => e => getEventMap(e).setView(e.target.getLatLng(), 6)

export const handleOnMouseoverMarker = style => ({setLabel, country}) => ({target, originalEvent: {clientX:x, clientY:y}}) => {
  setLabel({x, y, country})
  target.bringToFront()
  target.setStyle(style)
}

export const handleOnAddFeatureGroup = ({getEventMap}) => e => getEventMap(e).fitBounds(e.target.getBounds())


export const handleOnMouseOutMarker = style => ({setLabel}) => ({target}) => {
  target.setStyle(style)
  setLabel({})
}

