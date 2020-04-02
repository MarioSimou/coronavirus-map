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


export const handleCountryFeatureMap = countries => () => countries.features.reduce((acc,feature) => ({...acc, [feature.properties.ADM0_A3]:feature}),{})
