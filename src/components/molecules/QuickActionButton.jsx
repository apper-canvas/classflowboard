import React from 'react'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const QuickActionButton = ({ icon, label, onClick, className }) => {
  return (
    <Button
      onClick={onClick}
      className={`p-4 rounded-xl shadow-card flex items-center gap-3 hover:shadow-hover transition-all duration-200 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <ApperIcon name={icon} className="w-6 h-6" />
      <span className="font-medium">{label}</span>
    </Button>
  )
}

export default QuickActionButton