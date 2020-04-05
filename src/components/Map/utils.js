import 'regenerator-runtime'

export const handleFetchData = ({httpClient, url}) => async ({token, setCountries}) => {
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

export const handleOnViewportChange = ({radius}) => ({setRadius}) => ({zoom}) => setRadius(radius * 12.5 * (zoom/24))

export const handleOnClickMarker = ({getEventMap}) => e => getEventMap(e).setView(e.target.getLatLng(), 6)

export const handleOnAddFeatureGroup = ({getEventMap}) => e => getEventMap(e).fitBounds(e.target.getBounds())

export const handleOnMouseoverMarker = style => ({setLabel, country}) => ({target}) => {
  setLabel({country, target})
  target.bringToFront()
  target.setStyle(style)
}

export const handleResetMarkerStyle = style => target => target.setStyle(style)

export const handleOnMouseOutMarker = ({resetMarkerStyle}) => ({resetLabel}) => ({target}) =>  {
  resetMarkerStyle(target)
  resetLabel()
}

export const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
