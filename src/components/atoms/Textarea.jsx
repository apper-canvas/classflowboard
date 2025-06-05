import React from 'react'

const Textarea = ({ placeholder, value, onChange, className = '', rows = 3, ...props }) => {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full p-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${className}`}
      rows={rows}
      {...props}
    />
  )
}

export default Textarea