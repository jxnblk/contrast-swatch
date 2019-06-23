/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { useState, useEffect } from 'react'
import primerColors from 'primer-colors'

const flatten = (obj, parent) => {
  const colors = []
  for (const key in obj) {
    const value = obj[key]
    const name = [ parent, key ].filter(Boolean).join('.')
    if (typeof value === 'object') {
      colors.push(...flatten(value, name))
    } else {
      colors.push({ name, value })
    }
  }
  return colors
}

const primer = flatten(primerColors).filter(c => !/black|white/.test(c.name))

// you can add more color palettes by opening a PR
const palettes = {
  primer,
}

const stripHash = str => str.replace(/^#/, '')

const Swatch = ({
  color,
  bg,
  width = 96,
  height = 64,
  ...props
}) =>
  <img
    {...props}
    role='button'
    aria-label='Change base color'
    src={`https://contrast.now.sh/${stripHash(color)}/${stripHash(bg)}?width=${width}&height=${height}`}
  />

const Matrix = ({ colors, color, onSelect }) =>
  <div>
    {colors.map(({ name, value }, i) => (
      <Swatch
        key={name}
        color={color.value}
        bg={value}
        onClick={e => {
          onSelect({ name, value })
        }}
      />
    ))}
  </div>

export default props => {
  const [ palette, setPalette ] = useState('primer')
  const colors = palettes[palette]
  const [ color, setColor ] = useState(colors[0])

  useEffect(() => {
    setColor(colors[0])
  }, [ palette ])

  return (
    <div>
      <Styled.h2>Demo: {palette}: {color.name} ({colors.length} colors)</Styled.h2>
      <Styled.p>
        Click on a swatch to change the foreground color
      </Styled.p>
      <Matrix
        colors={colors}
        color={color}
        onSelect={next => {
          setColor(next)
        }}
      />
    </div>
  )
}

