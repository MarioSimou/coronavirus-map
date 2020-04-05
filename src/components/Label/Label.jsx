import React from 'react'
import 'src/components/Label/Label.module.css'

const ListItem = ({name,value}) => {
  return (
    <li className="list-item">
      <span className="list-item-name">{name}&#58;&nbsp;</span>
      <span className="list-item-value">{value}</span>
    </li>
  )
}

const Label = ({position, options, defaultText, show = false}) => {
  const {flag} = options?.countryInfo || {}
  const Flag = () =>  <img className="flag" src={flag} title={flag}/>


  return (
    <div className="label" style={position}>
      <h3>COV-19 Metrics</h3>
      {!show && <div className="hover">{defaultText}</div>}
      {show && 
      <React.Fragment>  
        <div className="label-header">
        <h3 className="label-title">{options.country}</h3>
        {flag && <Flag/>}
        </div>
        <ul className="list">
          <ListItem key={"today-cases-" + options.todayCases} name="Today cases" value={options.todayCases} />
          <ListItem key={"total-cases-" + options.cases} name="Total cases" value={options.cases}/>
          <ListItem key={"active-cases-" + options.active} name="Active cases" value={options.active}/>
          <ListItem key={"critical-cases-" + options.critical} name="Critical cases" value={options.critical} />
          <ListItem key={"today-deaths-" + options.todayDeaths} name="Today deaths" value={options.todayDeaths} />
          <ListItem key={"total-deaths" + options.deaths} name="Total deaths" value={options.deaths} />
        </ul>
      </React.Fragment>}
    </div>
  )
}

export default Label