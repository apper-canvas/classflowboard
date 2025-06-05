import React from 'react'

const Input = ({ type = 'text', placeholder, value, onChange, className = '', required = false, ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full p-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${className}`}
      required={required}
      {...props}
    />
  )
}

export default Input