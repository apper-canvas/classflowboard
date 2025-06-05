import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const NavigationItem = ({ item, activeTab, onClick }) => {
  return (
    <Button
      key={item.id}
      onClick={() => onClick(item.id)}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
        activeTab === item.id
          ? 'bg-primary text-white shadow-md'
          : item.active
            ? 'text-surface-700 hover:bg-surface-100'
            : 'text-surface-400 cursor-not-allowed opacity-60'
      }`}
      disabled={!item.active}
    >
      <ApperIcon name={item.icon} className="w-5 h-5" />
      <span className="font-medium">{item.label}</span>
      {!item.active && (
        <div className="ml-auto">
          <div className="w-2 h-2 bg-accent rounded-full"></div>
        </div>
      )}
    </Button>
  )
}

export default NavigationItem