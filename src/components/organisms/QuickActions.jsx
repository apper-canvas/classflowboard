import React from 'react'
import QuickActionButton from '@/components/molecules/QuickActionButton'

const QuickActions = ({ openModal }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <QuickActionButton
        icon="UserPlus"
        label="Add Student"
        onClick={() => openModal('students')}
        className="bg-gradient-to-r from-primary to-primary-light text-white"
      />
      <QuickActionButton
        icon="Plus"
        label="Create Batch"
        onClick={() => openModal('batches')}
        className="bg-gradient-to-r from-secondary to-secondary-light text-white"
      />
      <QuickActionButton
        icon="Calendar"
        label="Mark Attendance"
        onClick={() => openModal('attendance')}
        className="bg-gradient-to-r from-accent to-yellow-500 text-white"
      />
      <QuickActionButton
        icon="DollarSign"
        label="Record Payment"
        onClick={() => openModal('fees')}
        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white"
      />
    </div>
  )
}

export default QuickActions