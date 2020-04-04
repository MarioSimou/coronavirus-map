import React from 'react'
import 'src/components/Legend/Legend.module.css'

const positionOptions = {
  bottomRight: {bottom: 25, right: 10 },
  bottomLeft: {bottom: 25, left: 10},
  topLeft: {top: 25, left: 10},
  topRight: {top: 25, right: 10}
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