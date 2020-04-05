import React from 'react'
import 'src/components/Legend/Legend.module.css'
import config from 'src/utils/config.json'

const Legend = ({position= "bottomRight", title, fields = []}) => {
  return (

    <div className="legend" style={config.position[position]} >
      <h4 className="title">{title}</h4>
      {fields.map(([name,Field]) => {
        return <Field key={name}/>
      })}
    </div>
  )
}

export default Legend