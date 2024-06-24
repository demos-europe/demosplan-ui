import React from 'react'
import classNames from 'classnames'

const extractPaletteColors = (tokens) => {
    const result = []
    for (let key in tokens) {
        if (typeof tokens[key] === 'object' && tokens[key] !== null) {
            if (tokens[key].value) {
                const { item, subitem, state } = tokens[key].attributes || {}
                const keyName = [item, subitem, state].filter(Boolean).join('-').replace(/-DEFAULT/g, '')
                result.push({
                    twClass: 'bg-' + keyName,
                    name: keyName,
                    value: tokens[key].value,
                    description: tokens[key].$description
                })
            } else {
                result.push(...extractPaletteColors(tokens[key]))
            }
        }
    }
    return result
}

const colors = {
    brand: extractPaletteColors(require('../../tokens/dist/js/color.brand').color.brand),
    data: extractPaletteColors(require('../../tokens/dist/js/color.data').color.data),
    palette: extractPaletteColors(require('../../tokens/dist/js/color.palette').color.palette),
    ui: extractPaletteColors(require('../../tokens/dist/js/color.ui').color.ui),
}

const ColorPalette = ({namespace}) => (
  <table>
    <thead>
    <tr>
        <th className="whitespace-nowrap">Color</th>
        <th className="whitespace-nowrap">Name</th>
        <th className="whitespace-nowrap">Hex value</th>
        <th className="whitespace-nowrap">Description</th>
    </tr>
    </thead>
    <tbody>
    {colors[namespace].map((color, index) => (
        <tr key={index}>
            <td><div className={classNames(color.twClass, 'w-4 h-4')}></div></td>
            <td className="whitespace-nowrap">{color.name}</td>
            <td className="whitespace-nowrap">{color.value}</td>
            <td>{color.description}</td>
        </tr>
    ))}
    </tbody>
  </table>
)

export default ColorPalette
