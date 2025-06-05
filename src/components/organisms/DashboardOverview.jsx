import React from 'react'
import DashboardStatCard from '@/components/molecules/DashboardStatCard'

const DashboardOverview = ({ students, batches, getTotalFees, getOverdueFees }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <DashboardStatCard
        title="Total Students"
        value={students.length}
        icon="Users"
        iconBgColor="bg-primary bg-opacity-10"
        iconColor="text-primary"
        borderColor="border-primary"
      />
      <DashboardStatCard
        title="Active Batches"
        value={batches.length}
        icon="BookOpen"
        iconBgColor="bg-secondary bg-opacity-10"
        iconColor="text-secondary"
        borderColor="border-secondary"
      />
      <DashboardStatCard
        title="Fees Collected"
        value={`₹${getTotalFees().toLocaleString()}`}
        icon="CreditCard"
        iconBgColor="bg-accent bg-opacity-10"
        iconColor="text-accent"
        borderColor="border-accent"
      />
      <DashboardStatCard
        title="Overdue Payments"
        value={getOverdueFees()}
        icon="AlertTriangle"
        iconBgColor="bg-red-100"
        iconColor="text-red-500"
        borderColor="border-red-500"
      />
    </div>
  )
}

export default DashboardOverview