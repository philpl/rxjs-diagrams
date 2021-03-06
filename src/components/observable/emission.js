import React, { PureComponent } from 'react'

import { EMISSION_RADIUS } from './constants'
import { white, black } from '../../constants/colors'
import { fontFamily, fontSize } from '../../constants/font'

const circleStyle = isDraggable => ({
  cursor: isDraggable ? 'ew-resize' : 'default'
})

const textStyle = height => ({
  fontFamily,
  fontSize: `${height * 0.24}px`,
  lineHeight: `${height * 0.24}px`,
  textShadow: 'none',
  userSelect: 'none',
  pointerEvents: 'none'
})

class Emission extends PureComponent {
  render() {
    const {
      x,
      d,
      width,
      height,
      stroke,
      onMouseDown,
      isDraggable,
      isDragging,
      id,
      ...rest
    } = this.props

    return (
      <g>
        <circle
          style={circleStyle(isDraggable)}
          cx={x * width}
          cy={height / 2}
          r={EMISSION_RADIUS * height}
          fill={white.opacity(.95)}
          stroke={`url(#stroke-${id})`}
          strokeWidth={2}
          onMouseDown={evt => {
            evt.preventDefault()
            onMouseDown && onMouseDown({ ...rest, x, d })
          }}
          onTouchStart={evt => {
            onMouseDown && onMouseDown({ ...rest, x, d })
          }}
          filter={isDragging ? `url(#shadow-${id})` : ''}
        />

        <text
          x={x * width}
          y={height / 2}
          textAnchor="middle"
          alignmentBaseline="central"
          stroke={black}
          fill={black}
          style={textStyle(height)}
        >
          {d}
        </text>
      </g>
    )
  }
}

export default Emission
