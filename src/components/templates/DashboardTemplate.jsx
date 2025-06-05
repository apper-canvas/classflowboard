import React from 'react'
import Sidebar from '@/components/organisms/Sidebar'
import Header from '@/components/organisms/Header'

const DashboardTemplate = ({
  sidebarOpen,
  setSidebarOpen,
  navigationItems,
  activeTab,
  handleTabClick,
  children
}) => {
  return (
    <div className="flex min-h-screen bg-surface-50">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        navigationItems={navigationItems}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />

      <div className="flex-1 flex flex-col">
        <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}

export default DashboardTemplate