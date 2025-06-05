import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const ComingSoonCard = ({ feature }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center h-full p-8 bg-white rounded-xl shadow-soft"
    >
      <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center mb-6">
        <ApperIcon name="Zap" className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-surface-800 mb-2">{feature.title}</h2>
      <p className="text-surface-600 text-center mb-4 max-w-md">{feature.description}</p>
      <div className="bg-accent bg-opacity-10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
        {feature.eta}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-md">
        {feature.features.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-surface-600">
            <ApperIcon name="Check" className="w-4 h-4 text-secondary" />
            <span className="text-sm">{item}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default ComingSoonCard