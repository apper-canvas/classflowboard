import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import StudentForm from '@/components/organisms/StudentForm'
import BatchForm from '@/components/organisms/BatchForm'
import AttendanceForm from '@/components/organisms/AttendanceForm'
import FeeForm from '@/components/organisms/FeeForm'

const DataModal = ({
  showModal,
  setShowModal,
  activeSection,
  editingItem,
  studentForm,
  setStudentForm,
  batchForm,
  setBatchForm,
  attendanceForm,
  setAttendanceForm,
  feeForm,
  setFeeForm,
  handleStudentSubmit,
  handleBatchSubmit,
  handleAttendanceSubmit,
  handleFeeSubmit,
  loading,
  students,
  batches,
  selectedDate
}) => {
  const modalTitle = editingItem ? 'Edit' : 'Add'
  let formComponent = null

  const closeModal = () => setShowModal(false)

  switch (activeSection) {
    case 'students':
      formComponent = (
        <StudentForm
          studentForm={studentForm}
          setStudentForm={setStudentForm}
          handleSubmit={handleStudentSubmit}
          loading={loading}
          editingItem={editingItem}
          closeModal={closeModal}
        />
      )
      break
    case 'batches':
      formComponent = (
        <BatchForm
          batchForm={batchForm}
          setBatchForm={setBatchForm}
          handleSubmit={handleBatchSubmit}
          loading={loading}
          editingItem={editingItem}
          closeModal={closeModal}
        />
      )
      break
    case 'attendance':
      formComponent = (
        <AttendanceForm
          attendanceForm={attendanceForm}
          setAttendanceForm={setAttendanceForm}
          handleSubmit={handleAttendanceSubmit}
          loading={loading}
          students={students}
          batches={batches}
          selectedDate={selectedDate}
          closeModal={closeModal}
        />
      )
      break
    case 'fees':
      formComponent = (
        <FeeForm
          feeForm={feeForm}
          setFeeForm={setFeeForm}
          handleSubmit={handleFeeSubmit}
          loading={loading}
          students={students}
          batches={batches}
          closeModal={closeModal}
        />
      )
      break
    default:
      formComponent = null
  }

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-surface-800">
                {modalTitle} {activeSection.slice(0, -1)}
              </h3>
              <Button
                onClick={closeModal}
                className="text-surface-600 hover:text-surface-800"
              >
                <ApperIcon name="X" className="w-5 h-5" />
              </Button>
            </div>
            {formComponent}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default DataModal