import React from 'react'
const Table = ({headers, rows}) => (
  <table>
    <thead>
    <tr>
      {headers.map((header, index) => (
        <th className="whitespace-nowrap" key={index}>{header}</th>
      ))}
    </tr>
    </thead>
    <tbody>
    {rows.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {row.map((cell, cellIndex) => (
          <td className={headers[cellIndex] !== 'Description' ? 'whitespace-nowrap' : '-'} key={cellIndex}>{cell}</td>
        ))}
      </tr>
    ))}
    </tbody>
  </table>
)
export default Table
