import React from 'react'
import { motion } from 'framer-motion'

const Button = ({ children, onClick, className = '', type = 'button', disabled = false, whileHover, whileTap }) => {
  const motionProps = {
    whileHover: whileHover || (className.includes('hover:scale') ? {} : { scale: 1.02 }),
    whileTap: whileTap || (className.includes('active:scale') ? {} : { scale: 0.98 })
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`transition-all duration-200 ${className}`}
      disabled={disabled}
      {...motionProps}
    >
      {children}
    </motion.button>
  )
}

export default Button