import React, { useState } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', active: true },
    { id: 'students', label: 'Students', icon: 'Users', active: true },
    { id: 'batches', label: 'Batches', icon: 'BookOpen', active: true },
    { id: 'attendance', label: 'Attendance', icon: 'Calendar', active: true },
    { id: 'fees', label: 'Fees', icon: 'CreditCard', active: true },
    { id: 'assignments', label: 'Assignments', icon: 'FileText', active: false },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3', active: false },
    { id: 'reports', label: 'Reports', icon: 'FileBarChart', active: false },
    { id: 'settings', label: 'Settings', icon: 'Settings', active: false }
  ]

  const comingSoonFeatures = [
    { 
      id: 'assignments', 
      title: 'Assignment Management', 
      description: 'Create, distribute, and grade assignments digitally',
      eta: 'Coming Next Month',
      features: ['Digital assignment creation', 'Auto-grading system', 'Progress tracking', 'Submission management']
    },
    { 
      id: 'analytics', 
      title: 'Performance Analytics', 
      description: 'Advanced insights into student performance and batch effectiveness',
      eta: 'Launching in v2.0',
      features: ['Performance trends', 'Comparative analytics', 'Predictive insights', 'Custom dashboards']
    },
    { 
      id: 'reports', 
      title: 'Advanced Reports', 
      description: 'Comprehensive reporting with export capabilities',
      eta: 'Coming in Q2 2024',
      features: ['Custom report builder', 'Automated scheduling', 'Multi-format export', 'Visual charts']
    }
  ]

  const handleTabClick = (tabId) => {
    setActiveTab(tabId)
  }

  const renderComingSoon = (feature) => (
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

  return (
    <div className="flex min-h-screen bg-surface-50">
      {/* Sidebar */}
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
            <motion.button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
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
            </motion.button>
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 lg:px-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-surface-100 transition-colors"
          >
            <ApperIcon name="Menu" className="w-6 h-6 text-surface-600" />
          </button>
          
          <div className="flex items-center gap-4 ml-auto">
            <button className="p-2 rounded-lg hover:bg-surface-100 transition-colors relative">
              <ApperIcon name="Bell" className="w-6 h-6 text-surface-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </button>
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center">
              <ApperIcon name="User" className="w-5 h-5 text-white" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6">
          {activeTab === 'dashboard' && <MainFeature />}
          {activeTab === 'students' && <MainFeature />}
          {activeTab === 'batches' && <MainFeature />}
          {activeTab === 'attendance' && <MainFeature />}
          {activeTab === 'fees' && <MainFeature />}
          {!navigationItems.find(item => item.id === activeTab)?.active && 
            renderComingSoon(comingSoonFeatures.find(f => f.id === activeTab) || comingSoonFeatures[0])
          }
        </main>
      </div>
    </div>
  )
}

export default Home