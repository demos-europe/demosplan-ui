import React from 'react'
import classNames from 'classnames'

const extractPaletteColors = (tokens) => {
    const result = []
    for (let key in tokens) {
        if (typeof tokens[key] === 'object' && tokens[key] !== null) {
            if (tokens[key].value) {
                let item = tokens[key].attributes.item;
                let subitem = tokens[key].attributes.subitem;
                let keyName = subitem ? `${item}-${subitem}` : item;
                result.push({
                    twClass: 'bg-' + keyName,
                    name: keyName,
                    value: tokens[key].value
                })
            } else {
                result.push(...extractPaletteColors(tokens[key]))
            }
        }
    }
    return result
}

const tokens = require('../../tokens/dist/js/color.palette').color.palette
const colors = extractPaletteColors(tokens)

const ColorPalette = () => (
  <table>
    <thead>
    <tr>
        <th className="whitespace-nowrap">Farbe</th>
        <th className="whitespace-nowrap">Name</th>
        <th className="whitespace-nowrap">Hex-Wert</th>
    </tr>
    </thead>
    <tbody>
    {colors.map((color, index) => (
        <tr key={index}>
            <td><div className={classNames(color.twClass, 'w-4 h-4')}></div></td>
            <td>{color.name}</td>
            <td>{color.value}</td>
        </tr>
    ))}
    </tbody>
  </table>
)

export default ColorPalette
