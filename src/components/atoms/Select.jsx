import React from 'react'

const Select = ({ value, onChange, options, className = '', required = false, ...props }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`w-full p-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${className}`}
      required={required}
      {...props}
    >
      {options.map(option => (
        <option key={option.value} value={option.value} disabled={option.disabled}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default Select