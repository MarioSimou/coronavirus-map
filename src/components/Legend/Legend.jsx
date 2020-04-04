import React from 'react'
import 'src/components/Legend/Legend.module.css'

const positionOptions = {
  bottomRight: {bottom: 10, right: 10 },
  bottomLeft: {bottom: 10, left: 10},
  topLeft: {top: 55, left: 10},
  topRight: {top: 55, right: 10}
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