import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import { studentService } from '../services'
import { batchService } from '../services'
import { attendanceService } from '../services'
import { feePaymentService } from '../services'

const MainFeature = () => {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [students, setStudents] = useState([])
  const [batches, setBatches] = useState([])
  const [attendance, setAttendance] = useState([])
  const [feePayments, setFeePayments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  // Form states
  const [studentForm, setStudentForm] = useState({
    name: '',
    email: '',
    phone: '',
    parentPhone: '',
    address: '',
    batchIds: [],
    status: 'active'
  })

  const [batchForm, setBatchForm] = useState({
    name: '',
    subject: '',
    schedule: '',
    capacity: '',
    fees: '',
    startDate: ''
  })

  const [attendanceForm, setAttendanceForm] = useState({
    studentId: '',
    batchId: '',
    date: selectedDate,
    status: 'present',
    remarks: ''
  })

  const [feeForm, setFeeForm] = useState({
    studentId: '',
    batchId: '',
    amount: '',
    dueDate: '',
    paidDate: '',
    status: 'pending',
    paymentMode: 'cash'
  })

  // Load all data
  useEffect(() => {
    loadAllData()
  }, [])

  const loadAllData = async () => {
    setLoading(true)
    try {
      const [studentsData, batchesData, attendanceData, feeData] = await Promise.all([
        studentService.getAll(),
        batchService.getAll(),
        attendanceService.getAll(),
        feePaymentService.getAll()
      ])
      setStudents(studentsData || [])
      setBatches(batchesData || [])
      setAttendance(attendanceData || [])
      setFeePayments(feeData || [])
    } catch (err) {
      setError(err.message)
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  // Student operations
  const handleStudentSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (editingItem) {
        const updated = await studentService.update(editingItem.id, studentForm)
        setStudents(students.map(s => s.id === editingItem.id ? updated : s))
        toast.success('Student updated successfully')
      } else {
        const newStudent = await studentService.create({
          ...studentForm,
          enrollmentDate: new Date().toISOString().split('T')[0]
        })
        setStudents([...students, newStudent])
        toast.success('Student added successfully')
      }
      resetForms()
      setShowModal(false)
    } catch (err) {
      toast.error('Failed to save student')
    } finally {
      setLoading(false)
    }
  }

  const handleBatchSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (editingItem) {
        const updated = await batchService.update(editingItem.id, batchForm)
        setBatches(batches.map(b => b.id === editingItem.id ? updated : b))
        toast.success('Batch updated successfully')
      } else {
        const newBatch = await batchService.create({
          ...batchForm,
          studentIds: [],
          capacity: parseInt(batchForm.capacity),
          fees: parseFloat(batchForm.fees)
        })
        setBatches([...batches, newBatch])
        toast.success('Batch created successfully')
      }
      resetForms()
      setShowModal(false)
    } catch (err) {
      toast.error('Failed to save batch')
    } finally {
      setLoading(false)
    }
  }

  const handleAttendanceSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const newAttendance = await attendanceService.create(attendanceForm)
      setAttendance([...attendance, newAttendance])
      toast.success('Attendance recorded successfully')
      resetForms()
      setShowModal(false)
    } catch (err) {
      toast.error('Failed to record attendance')
    } finally {
      setLoading(false)
    }
  }

  const handleFeeSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const newFeePayment = await feePaymentService.create({
        ...feeForm,
        amount: parseFloat(feeForm.amount)
      })
      setFeePayments([...feePayments, newFeePayment])
      toast.success('Fee payment recorded successfully')
      resetForms()
      setShowModal(false)
    } catch (err) {
      toast.error('Failed to record payment')
    } finally {
      setLoading(false)
    }
  }

  const deleteStudent = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await studentService.delete(id)
        setStudents(students.filter(s => s.id !== id))
        toast.success('Student deleted successfully')
      } catch (err) {
        toast.error('Failed to delete student')
      }
    }
  }

  const deleteBatch = async (id) => {
    if (window.confirm('Are you sure you want to delete this batch?')) {
      try {
        await batchService.delete(id)
        setBatches(batches.filter(b => b.id !== id))
        toast.success('Batch deleted successfully')
      } catch (err) {
        toast.error('Failed to delete batch')
      }
    }
  }

  const resetForms = () => {
    setStudentForm({
      name: '',
      email: '',
      phone: '',
      parentPhone: '',
      address: '',
      batchIds: [],
      status: 'active'
    })
    setBatchForm({
      name: '',
      subject: '',
      schedule: '',
      capacity: '',
      fees: '',
      startDate: ''
    })
    setAttendanceForm({
      studentId: '',
      batchId: '',
      date: selectedDate,
      status: 'present',
      remarks: ''
    })
    setFeeForm({
      studentId: '',
      batchId: '',
      amount: '',
      dueDate: '',
      paidDate: '',
      status: 'pending',
      paymentMode: 'cash'
    })
    setEditingItem(null)
  }

  const openModal = (section, item = null) => {
    setActiveSection(section)
    if (item) {
      setEditingItem(item)
      if (section === 'students') {
        setStudentForm(item)
      } else if (section === 'batches') {
        setBatchForm(item)
      }
    } else {
      resetForms()
    }
    setShowModal(true)
  }

  const filteredStudents = students.filter(student =>
    student?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStudentName = (studentId) => {
    const student = students.find(s => s.id === studentId)
    return student?.name || 'Unknown Student'
  }

  const getBatchName = (batchId) => {
    const batch = batches.find(b => b.id === batchId)
    return batch?.name || 'Unknown Batch'
  }

  const calculateAttendancePercentage = (studentId) => {
    const studentAttendance = attendance.filter(a => a.studentId === studentId)
    if (studentAttendance.length === 0) return 0
    const presentCount = studentAttendance.filter(a => a.status === 'present').length
    return Math.round((presentCount / studentAttendance.length) * 100)
  }

  const getTotalFees = () => {
    return feePayments.reduce((total, payment) => {
      if (payment.status === 'paid') {
        return total + (payment.amount || 0)
      }
      return total
    }, 0)
  }

  const getOverdueFees = () => {
    return feePayments.filter(payment => payment.status === 'overdue').length
  }

  if (loading && students.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-surface-600">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-xl shadow-card border-l-4 border-primary"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-surface-600 text-sm">Total Students</p>
              <p className="text-2xl font-bold text-surface-800">{students.length}</p>
            </div>
            <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
              <ApperIcon name="Users" className="w-6 h-6 text-primary" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-xl shadow-card border-l-4 border-secondary"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-surface-600 text-sm">Active Batches</p>
              <p className="text-2xl font-bold text-surface-800">{batches.length}</p>
            </div>
            <div className="w-12 h-12 bg-secondary bg-opacity-10 rounded-lg flex items-center justify-center">
              <ApperIcon name="BookOpen" className="w-6 h-6 text-secondary" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-xl shadow-card border-l-4 border-accent"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-surface-600 text-sm">Fees Collected</p>
              <p className="text-2xl font-bold text-surface-800">₹{getTotalFees().toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-accent bg-opacity-10 rounded-lg flex items-center justify-center">
              <ApperIcon name="CreditCard" className="w-6 h-6 text-accent" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-xl shadow-card border-l-4 border-red-500"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-surface-600 text-sm">Overdue Payments</p>
              <p className="text-2xl font-bold text-surface-800">{getOverdueFees()}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <ApperIcon name="AlertTriangle" className="w-6 h-6 text-red-500" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => openModal('students')}
          className="bg-gradient-to-r from-primary to-primary-light text-white p-4 rounded-xl shadow-card flex items-center gap-3 hover:shadow-hover transition-all duration-200"
        >
          <ApperIcon name="UserPlus" className="w-6 h-6" />
          <span className="font-medium">Add Student</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => openModal('batches')}
          className="bg-gradient-to-r from-secondary to-secondary-light text-white p-4 rounded-xl shadow-card flex items-center gap-3 hover:shadow-hover transition-all duration-200"
        >
          <ApperIcon name="Plus" className="w-6 h-6" />
          <span className="font-medium">Create Batch</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => openModal('attendance')}
          className="bg-gradient-to-r from-accent to-yellow-500 text-white p-4 rounded-xl shadow-card flex items-center gap-3 hover:shadow-hover transition-all duration-200"
        >
          <ApperIcon name="Calendar" className="w-6 h-6" />
          <span className="font-medium">Mark Attendance</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => openModal('fees')}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl shadow-card flex items-center gap-3 hover:shadow-hover transition-all duration-200"
        >
          <ApperIcon name="DollarSign" className="w-6 h-6" />
          <span className="font-medium">Record Payment</span>
        </motion.button>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl font-bold text-surface-800">Students</h2>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative">
              <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary w-full sm:w-64"
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
                      <button
                        onClick={() => openModal('students', student)}
                        className="p-1 text-surface-600 hover:text-primary transition-colors"
                      >
                        <ApperIcon name="Edit" className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteStudent(student.id)}
                        className="p-1 text-surface-600 hover:text-red-500 transition-colors"
                      >
                        <ApperIcon name="Trash2" className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filteredStudents.length === 0 && (
            <div className="text-center py-8 text-surface-600">
              No students found
            </div>
          )}
        </div>
      </div>

      {/* Batches Grid */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-surface-800">Batches</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {batches.map((batch) => (
            <motion.div
              key={batch.id}
              whileHover={{ scale: 1.02 }}
              className="border border-surface-200 rounded-lg p-4 hover:shadow-card transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-surface-800">{batch.name}</h3>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openModal('batches', batch)}
                    className="p-1 text-surface-600 hover:text-primary transition-colors"
                  >
                    <ApperIcon name="Edit" className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteBatch(batch.id)}
                    className="p-1 text-surface-600 hover:text-red-500 transition-colors"
                  >
                    <ApperIcon name="Trash2" className="w-4 h-4" />
                  </button>
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
            </motion.div>
          ))}
        </div>
        {batches.length === 0 && (
          <div className="text-center py-8 text-surface-600">
            No batches created yet
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
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
                  {editingItem ? 'Edit' : 'Add'} {activeSection.slice(0, -1)}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-surface-600 hover:text-surface-800 transition-colors"
                >
                  <ApperIcon name="X" className="w-5 h-5" />
                </button>
              </div>

              {activeSection === 'students' && (
                <form onSubmit={handleStudentSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={studentForm.name}
                    onChange={(e) => setStudentForm({...studentForm, name: e.target.value})}
                    className="w-full p-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={studentForm.email}
                    onChange={(e) => setStudentForm({...studentForm, email: e.target.value})}
                    className="w-full p-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={studentForm.phone}
                    onChange={(e) => setStudentForm({...studentForm, phone: e.target.value})}
                    className="w-full p-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Parent Phone"
                    value={studentForm.parentPhone}
                    onChange={(e) => setStudentForm({...studentForm, parentPhone: e.target.value})}
                    className="w-full p-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                  <textarea
                    placeholder="Address"
                    value={studentForm.address}
                    onChange={(e) => setStudentForm({...studentForm, address: e.target.value})}
                    className="w-full p-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    rows="3"
                  />
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 py-3 border border-surface-300 text-surface-700 rounded-lg hover:bg-surface-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Saving...' : editingItem ? 'Update' : 'Add'} Student
                    </button>
                  </div>
                </form>
              )}

              {activeSection === 'batches' && (
                <form onSubmit={handleBatchSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Batch Name"
                    value={batchForm.name}
                    onChange={(e) => setBatchForm({...batchForm, name: e.target.value})}
                    className="w-full p-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Subject"
                    value={batchForm.subject}
                    onChange={(e) => setBatchForm({...batchForm, subject: e.target.value})}
                    className="w-full p-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Schedule (e.g., Mon-Fri 10:00-12:00)"
                    value={batchForm.schedule}
                    onChange={(e) => setBatchForm({...batchForm, schedule: e.target.value})}
                    className="w-full p-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Capacity"
                    value={batchForm.capacity}
                    onChange={(e) => setBatchForm({...batchForm, capacity: e.target.value})}
                    className="w-full p-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Monthly Fees"
                    value={batchForm.fees}
                    onChange={(e) => setBatchForm({...batchForm, fees: e.target.value})}
                    className="w-full p-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                  <input
                    type="date"
                    placeholder="Start Date"
                    value={batchForm.startDate}
                    onChange={(e) => setBatchForm({...batchForm, startDate: e.target.value})}
                    className="w-full p-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 py-3 border border-surface-300 text-surface-700 rounded-lg hover:bg-surface-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Saving...' : editingItem ? 'Update' : 'Create'} Batch
                    </button>
                  </div>
                </form>
              )}

              {activeSection === 'attendance' && (
                <form onSubmit={handleAttendanceSubmit} className="space-y-4">
                  <select
                    value={attendanceForm.studentId}
                    onChange={(e) => setAttendanceForm({...attendanceForm, studentId: e.target.value})}
                    className="w-full p-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  >
                    <option value="">Select Student</option>
                    {students.map(student => (
                      <option key={student.id} value={student.id}>{student.name}</option>
                    ))}
                  </select>
                  <select
                    value={attendanceForm.batchId}
                    onChange={(e) => setAttendanceForm({...attendanceForm, batchId: e.target.value})}
                    className="w-full p-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  >
                    <option value="">Select Batch</option>
                    {batches.map(batch => (
                      <option key={batch.id} value={batch.id}>{batch.name}</option>
                    ))}
                  </select>
                  <input
                    type="date"
                    value={attendanceForm.date}
                    onChange={(e) => setAttendanceForm({...attendanceForm, date: e.target.value})}
                    className="w-full p-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                  <select
                    value={attendanceForm.status}
                    onChange={(e) => setAttendanceForm({...attendanceForm, status: e.target.value})}
                    className="w-full p-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  >
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="late">Late</option>
                  </select>
                  <textarea
                    placeholder="Remarks (optional)"
                    value={attendanceForm.remarks}
                    onChange={(e) => setAttendanceForm({...attendanceForm, remarks: e.target.value})}
                    className="w-full p-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    rows="2"
                  />
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 py-3 border border-surface-300 text-surface-700 rounded-lg hover:bg-surface-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Recording...' : 'Record Attendance'}
                    </button>
                  </div>
                </form>
              )}

              {activeSection === 'fees' && (
                <form onSubmit={handleFeeSubmit} className="space-y-4">
                  <select
                    value={feeForm.studentId}
                    onChange={(e) => setFeeForm({...feeForm, studentId: e.target.value})}
                    className="w-full p-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  >
                    <option value="">Select Student</option>
                    {students.map(student => (
                      <option key={student.id} value={student.id}>{student.name}</option>
                    ))}
                  </select>
                  <select
                    value={feeForm.batchId}
                    onChange={(e) => setFeeForm({...feeForm, batchId: e.target.value})}
                    className="w-full p-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  >
                    <option value="">Select Batch</option>
                    {batches.map(batch => (
                      <option key={batch.id} value={batch.id}>{batch.name}</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    placeholder="Amount"
                    value={feeForm.amount}
                    onChange={(e) => setFeeForm({...feeForm, amount: e.target.value})}
                    className="w-full p-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                  <input
                    type="date"
                    placeholder="Due Date"
                    value={feeForm.dueDate}
                    onChange={(e) => setFeeForm({...feeForm, dueDate: e.target.value})}
                    className="w-full p-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                  <input
                    type="date"
                    placeholder="Paid Date"
                    value={feeForm.paidDate}
                    onChange={(e) => setFeeForm({...feeForm, paidDate: e.target.value})}
                    className="w-full p-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                  <select
                    value={feeForm.status}
                    onChange={(e) => setFeeForm({...feeForm, status: e.target.value})}
                    className="w-full p-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                  </select>
                  <select
                    value={feeForm.paymentMode}
                    onChange={(e) => setFeeForm({...feeForm, paymentMode: e.target.value})}
                    className="w-full p-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  >
                    <option value="cash">Cash</option>
                    <option value="online">Online</option>
                    <option value="cheque">Cheque</option>
                  </select>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 py-3 border border-surface-300 text-surface-700 rounded-lg hover:bg-surface-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Recording...' : 'Record Payment'}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature