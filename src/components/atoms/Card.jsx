import React from 'react'
import { motion } from 'framer-motion'

const Card = ({ children, className = '', whileHover }) => {
  return (
    <motion.div
      whileHover={whileHover || { scale: 1.02 }}
      className={`bg-white rounded-xl shadow-card ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default Card