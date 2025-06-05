import React from 'react'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'

const BatchCard = ({ batch, openModal, deleteBatch }) => {
  return (
    <Card className="border border-surface-200 p-4 hover:shadow-card transition-all duration-200">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-surface-800">{batch.name}</h3>
        <div className="flex items-center gap-1">
          <Button
            onClick={() => openModal('batches', batch)}
            className="p-1 text-surface-600 hover:text-primary"
          >
            <ApperIcon name="Edit" className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => deleteBatch(batch.id)}
            className="p-1 text-surface-600 hover:text-red-500"
          >
            <ApperIcon name="Trash2" className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <p className="text-surface-600 mb-2">{batch.subject}</p>
      <p className="text-sm text-surface-600 mb-2">{batch.schedule}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-surface-600">
          {batch.studentIds?.length || 0}/{batch.capacity} students
        </span>
        <span className="text-primary font-medium">₹{batch.fees}</span>
      </div>
    </Card>
  )
}

export default BatchCard