import React from 'react'
import ApperIcon from '@/components/ApperIcon'
import Input from '@/components/atoms/Input'
import TableRow from '@/components/molecules/TableRow'
import Card from '@/components/atoms/Card'

const StudentsTable = ({
  filteredStudents,
  searchTerm,
  setSearchTerm,
  getBatchName,
  calculateAttendancePercentage,
  openModal,
  deleteStudent
}) => {
  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-bold text-surface-800">Students</h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative">
            <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400" />
            <Input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-surface-200">
              <th className="text-left py-3 px-4 font-medium text-surface-700">Name</th>
              <th className="text-left py-3 px-4 font-medium text-surface-700">Contact</th>
              <th className="text-left py-3 px-4 font-medium text-surface-700">Batches</th>
              <th className="text-left py-3 px-4 font-medium text-surface-700">Attendance</th>
              <th className="text-left py-3 px-4 font-medium text-surface-700">Status</th>
              <th className="text-left py-3 px-4 font-medium text-surface-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <TableRow
                key={student.id}
                student={student}
                getBatchName={getBatchName}
                calculateAttendancePercentage={calculateAttendancePercentage}
                openModal={openModal}
                deleteStudent={deleteStudent}
              />
            ))}
          </tbody>
        </table>
        {filteredStudents.length === 0 && (
          <div className="text-center py-8 text-surface-600">
            No students found
          </div>
        )}
      </div>
    </Card>
  )
}

export default StudentsTable