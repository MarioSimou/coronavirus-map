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

const Label = ({left, top, options}) => {
  const {flag} = options.countryInfo
  const Flag = () =>  <img className="flag" src={flag} title={flag}/>

  return (
    <div className="label" style={{left, top}}>
      <div className="label-header">
        {flag && <Flag/>}
        <h3 className="label-title">{options.country}</h3>
      </div>
      <ul className="list">
          <ListItem key={"today-cases-" + options.todayCases} name="Today cases" value={options.todayCases} />
          <ListItem key={"total-cases-" + options.cases} name="Total cases" value={options.cases}/>
          <ListItem key={"active-cases-" + options.active} name="Active cases" value={options.active}/>
          <ListItem key={"critical-cases-" + options.critical} name="Critical cases" value={options.critical} />
          <ListItem key={"today-deaths-" + options.todayDeaths} name="Today deaths" value={options.todayDeaths} />
          <ListItem key={"total-deaths" + options.deaths} name="Total deaths" value={options.deaths} />
        </ul>
    </div>
  )
}

export default Label