import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-24 h-24 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <ApperIcon name="GraduationCap" className="w-12 h-12 text-white" />
        </motion.div>
        
        <h1 className="text-4xl font-bold text-surface-800 mb-4">404</h1>
        <h2 className="text-xl font-semibold text-surface-700 mb-4">Page Not Found</h2>
        <p className="text-surface-600 mb-8">
          Sorry, the page you're looking for doesn't exist. Let's get you back to managing your classes.
        </p>
        
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-light text-white px-6 py-3 rounded-lg font-medium hover:shadow-hover transition-all duration-200 transform hover:scale-105"
        >
          <ApperIcon name="ArrowLeft" className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </motion.div>
    </div>
  )
}

export default NotFound