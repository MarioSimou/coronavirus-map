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

export const getCircleMarkerFillColor = cases => {
  return cases > 1000 ? '#800026' :
         cases > 500  ? '#BD0026' :
         cases > 200  ? '#E31A1C' :
         cases > 100  ? '#FC4E2A' :
         cases > 50   ? '#FD8D3C' :
         cases > 20   ? '#FEB24C' :
         cases > 10   ? '#FED976' :
                        '#FFEDA0';
}

export const getEventMap = e => e.sourceTarget._map

export const handleOnViewportChange = () => ({setRadius}) => ({zoom}) => setRadius(100 * (zoom/24))

export const handleOnClickMarker = ({getEventMap}) => e => getEventMap(e).setView(e.target.getLatLng(), 6)

export const handleOnMouseoverMarker = style => ({setLabel, country}) => ({target, sourceTarget}) => {
  setLabel({...target._point, country})
  target.bringToFront()
  target.setStyle(style)
}

export const handleOnMouseOutMarker = style => ({setLabel}) => ({target}) => {
  target.setStyle(style)
  setLabel({})
}

