import React from 'react'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Header = ({ onMenuToggle }) => {
  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 lg:px-6">
      <Button
        onClick={onMenuToggle}
        className="lg:hidden p-2 rounded-lg hover:bg-surface-100"
      >
        <ApperIcon name="Menu" className="w-6 h-6 text-surface-600" />
      </Button>

      <div className="flex items-center gap-4 ml-auto">
        <Button className="p-2 rounded-lg hover:bg-surface-100 relative">
          <ApperIcon name="Bell" className="w-6 h-6 text-surface-600" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
        </Button>
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center">
          <ApperIcon name="User" className="w-5 h-5 text-white" />
        </div>
      </div>
    </header>
  )
}

export default Header