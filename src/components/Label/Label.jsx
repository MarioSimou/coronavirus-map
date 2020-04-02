import React from 'react'
import 'src/components/Label/Label.module.css'

const Label = ({left, top, options}) => {
  return (
    <div className="label" style={{left, top}}>
        <h1>{options.country}</h1>
    </div>
  )
}

export default Label