import React from 'react'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import Textarea from '@/components/atoms/Textarea'

const FormField = ({ label, type, value, onChange, options, placeholder, required = false, rows, className = '' }) => {
  const commonProps = {
    value,
    onChange,
    placeholder,
    required,
    className
  }

  switch (type) {
    case 'select':
      return (
        <div className="space-y-1">
          {label && <label className="block text-sm font-medium text-surface-700">{label}</label>}
          <Select options={options} {...commonProps} />
        </div>
      )
    case 'textarea':
      return (
        <div className="space-y-1">
          {label && <label className="block text-sm font-medium text-surface-700">{label}</label>}
          <Textarea rows={rows} {...commonProps} />
        </div>
      )
    default:
      return (
        <div className="space-y-1">
          {label && <label className="block text-sm font-medium text-surface-700">{label}</label>}
          <Input type={type} {...commonProps} />
        </div>
      )
  }
}

export default FormField