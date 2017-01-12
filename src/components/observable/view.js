import React from 'react'

import { white, blue, black, gray } from '../../constants/colors'

import {
  EMISSION_RADIUS,
  ARROW_WIDTH_FACTOR
} from './constants'

import Defs from './defs'
import Arrow from './arrow'
import Separators from './separators'
import Emission from './emission'
import Completion from './completion'

const PADDING_FACTOR = 0.03
const SEPARATORS = 20

const ObservableView = ({
  width = 500,
  height = 50,
  scale = 1,
  completion = 1,
  emissions = [],
  onMouseDown,
  onMouseUp
}) => {
  const strokeFactor = 2 / height
  const emissionRadius = EMISSION_RADIUS + strokeFactor
  const boundedPadding = (PADDING_FACTOR * width > emissionRadius * height) ? PADDING_FACTOR : (emissionRadius * height) / width
  const upperBound = 1 - boundedPadding - ARROW_WIDTH_FACTOR
  const transformFactor = x => (
    (upperBound - boundedPadding) * (x / scale) + boundedPadding
  )

  const last = emissions[emissions.length - 1]
  const lastCoincidesCompletion = last.x === completion

  const leftX = transformFactor(0) * width
  const rightX = transformFactor(1) * width

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
    >
      <Defs x={completion ? transformFactor(completion) : 1}/>
      <Arrow height={height} width={width}/>
      <Separators height={height} width={width} transformFactor={transformFactor}/>

      { completion && (
        <Completion
          bold={lastCoincidesCompletion}
          x={transformFactor(completion)}
          height={height}
          width={width}
        />
      )}

      {
        emissions.map(({ x, d, ...rest }, i) => (
          <Emission
            {...rest}
            key={i}
            width={width}
            height={height}
            stroke="url(#stroke)"
            x={transformFactor(x)}
            d={d}
            onMouseDown={(data) => {
              onMouseDown && onMouseDown({
                ...data,
                leftX,
                rightX
              })
            }}
            onMouseUp={(data) => {
              onMouseUp && onMouseUp({
                ...data,
                leftX,
                rightX
              })
            }}
          />
        ))
      }
    </svg>
  )
}

export default ObservableView
