import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const TableRow = ({
  student,
  getBatchName,
  calculateAttendancePercentage,
  openModal,
  deleteStudent
}) => {
  return (
    <motion.tr
      key={student.id}
      whileHover={{ backgroundColor: '#f8fafc' }}
      className="border-b border-surface-100"
    >
      <td className="py-3 px-4">
        <div>
          <p className="font-medium text-surface-800">{student.name}</p>
          <p className="text-sm text-surface-600">{student.email}</p>
        </div>
      </td>
      <td className="py-3 px-4">
        <div>
          <p className="text-surface-800">{student.phone}</p>
          <p className="text-sm text-surface-600">{student.parentPhone}</p>
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="flex flex-wrap gap-1">
          {student.batchIds?.map(batchId => (
            <span key={batchId} className="bg-primary bg-opacity-10 text-primary text-xs px-2 py-1 rounded">
              {getBatchName(batchId)}
            </span>
          ))}
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-surface-200 flex items-center justify-center">
            <span className="text-xs font-medium">{calculateAttendancePercentage(student.id)}%</span>
          </div>
        </div>
      </td>
      <td className="py-3 px-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          student.status === 'active'
            ? 'bg-secondary bg-opacity-10 text-secondary'
            : 'bg-surface-100 text-surface-600'
        }`}>
          {student.status}
        </span>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => openModal('students', student)}
            className="p-1 text-surface-600 hover:text-primary"
          >
            <ApperIcon name="Edit" className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => deleteStudent(student.id)}
            className="p-1 text-surface-600 hover:text-red-500"
          >
            <ApperIcon name="Trash2" className="w-4 h-4" />
          </Button>
        </div>
      </td>
    </motion.tr>
  )
}

export default TableRow