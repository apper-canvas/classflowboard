import React from 'react'
import { motion } from 'framer-motion'
import NavigationItem from '@/components/molecules/NavigationItem'

const Sidebar = ({ navigationItems, activeTab, handleTabClick, sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      <motion.div
        initial={{ x: -240 }}
        animate={{ x: sidebarOpen ? 0 : -240 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed lg:static z-30 w-60 h-screen bg-white shadow-soft ${sidebarOpen ? 'block' : 'hidden lg:block'}`}
      >
        {/* Header */}
        <div className="h-16 bg-gradient-to-r from-primary to-primary-light flex items-center justify-center">
          <h1 className="text-white font-bold text-xl">ClassFlow Pro</h1>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => (
            <NavigationItem
              key={item.id}
              item={item}
              activeTab={activeTab}
              onClick={handleTabClick}
            />
          ))}
        </nav>
      </motion.div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  )
}

export default Sidebar