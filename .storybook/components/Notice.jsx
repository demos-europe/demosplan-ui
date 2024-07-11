import React from 'react'

const Notice = ({content}) => (
  <p className="sb-unstyled my-2 p-3 text-sm text-message-info bg-message-info border border-message-info">
      {content}
  </p>
)

export default Notice
