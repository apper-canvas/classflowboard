import React from 'react'
import Card from '@/components/atoms/Card'
import ApperIcon from '@/components/ApperIcon'

const DashboardStatCard = ({ title, value, icon, iconBgColor, iconColor, borderColor }) => {
  return (
    <Card className={`p-6 border-l-4 ${borderColor}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-surface-600 text-sm">{title}</p>
          <p className="text-2xl font-bold text-surface-800">{value}</p>
        </div>
        <div className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center`}>
          <ApperIcon name={icon} className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
    </Card>
  )
}

export default DashboardStatCard