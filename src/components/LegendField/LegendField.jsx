import React from 'react'
import 'src/components/LegendField/LegendField.module.css'

const Dash = () => <span>&ndash;</span>

const LegendField = ({color, start, end = "", sep = Dash }) => {
  return (
    <div className="field">
      <div style={{backgroundColor: color}} />
      <div>{start}{sep()}{end}</div>
    </div>
  )
}

export default LegendField