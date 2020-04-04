import React from 'react'
import 'src/components/Legend/Legend.module.css'

const positionOptions = {
  bottomright: {bottom: 10, right: 10 },
  bottomleft: {bottom: 10, left: 10},
  topleft: {top: 65, left: 10},
  topright: {top: 65, right: 10}
}

const Legend = ({position= "bottomRight", fields = []}) => {
  return (
    <div className="legend" style={positionOptions[position]} >
      {fields.map(([name,Field]) => {
        return <Field key={name}/>
      })}
    </div>
  )
}

export default Legend