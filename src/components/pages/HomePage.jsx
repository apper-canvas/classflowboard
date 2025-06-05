import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { studentService, batchService, attendanceService, feePaymentService } from '@/services'
import DashboardTemplate from '@/components/templates/DashboardTemplate'
import DashboardOverview from '@/components/organisms/DashboardOverview'
import QuickActions from '@/components/organisms/QuickActions'
import StudentsTable from '@/components/organisms/StudentsTable'
import BatchCard from '@/components/organisms/BatchCard'
import DataModal from '@/components/organisms/DataModal'
import ComingSoonCard from '@/components/molecules/ComingSoonCard'
import ApperIcon from '@/components/ApperIcon'

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeSection, setActiveSection] = useState('dashboard') // For modal content
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

  // Handle tab navigation
  const handleTabClick = (tabId) => {
    setActiveTab(tabId)
    setSidebarOpen(false) // Close sidebar on mobile after selection
  }

  // Form handlers
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

  // Delete operations
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

  // Modal control
  const resetForms = () => {
    setStudentForm({
      name: '', email: '', phone: '', parentPhone: '', address: '', batchIds: [], status: 'active'
    })
    setBatchForm({
      name: '', subject: '', schedule: '', capacity: '', fees: '', startDate: ''
    })
    setAttendanceForm({
      studentId: '', batchId: '', date: selectedDate, status: 'present', remarks: ''
    })
    setFeeForm({
      studentId: '', batchId: '', amount: '', dueDate: '', paidDate: '', status: 'pending', paymentMode: 'cash'
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

  // Utility functions for rendering data
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
    <DashboardTemplate
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      navigationItems={navigationItems}
      activeTab={activeTab}
      handleTabClick={handleTabClick}
    >
      <div className="space-y-6">
        {activeTab === 'dashboard' && (
          <>
            <DashboardOverview
              students={students}
              batches={batches}
              getTotalFees={getTotalFees}
              getOverdueFees={getOverdueFees}
            />
            <QuickActions openModal={openModal} />
            <StudentsTable
              filteredStudents={filteredStudents}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              getBatchName={getBatchName}
              calculateAttendancePercentage={calculateAttendancePercentage}
              openModal={openModal}
              deleteStudent={deleteStudent}
            />
            <div className="bg-white rounded-xl shadow-card p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-surface-800">Batches</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {batches.map((batch) => (
                  <BatchCard
                    key={batch.id}
                    batch={batch}
                    openModal={openModal}
                    deleteBatch={deleteBatch}
                  />
                ))}
              </div>
              {batches.length === 0 && (
                <div className="text-center py-8 text-surface-600">
                  No batches created yet
                </div>
              )}
            </div>
          </>
        )}
        {activeTab === 'students' && (
          <StudentsTable
            filteredStudents={filteredStudents}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            getBatchName={getBatchName}
            calculateAttendancePercentage={calculateAttendancePercentage}
            openModal={openModal}
            deleteStudent={deleteStudent}
          />
        )}
        {activeTab === 'batches' && (
          <div className="bg-white rounded-xl shadow-card p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-surface-800">Batches</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {batches.map((batch) => (
                <BatchCard
                  key={batch.id}
                  batch={batch}
                  openModal={openModal}
                  deleteBatch={deleteBatch}
                />
              ))}
            </div>
            {batches.length === 0 && (
              <div className="text-center py-8 text-surface-600">
                No batches created yet
              </div>
            )}
          </div>
        )}
        {activeTab === 'attendance' && (
            <ComingSoonCard feature={{
                id: 'attendance',
                title: 'Attendance Management',
                description: 'Record and track student attendance with ease.',
                eta: 'Available Soon',
                features: ['Daily attendance tracking', 'Absence reporting', 'Attendance summaries', 'Export options']
            }} />
        )}
        {activeTab === 'fees' && (
            <ComingSoonCard feature={{
                id: 'fees',
                title: 'Fee Management',
                description: 'Simplify fee collection and payment tracking.',
                eta: 'Available Soon',
                features: ['Invoice generation', 'Payment reminders', 'Transaction history', 'Reporting']
            }} />
        )}
        {!navigationItems.find(item => item.id === activeTab)?.active &&
          comingSoonFeatures.find(f => f.id === activeTab) && (
            <ComingSoonCard feature={comingSoonFeatures.find(f => f.id === activeTab)} />
          )}
      </div>

      <DataModal
        showModal={showModal}
        setShowModal={setShowModal}
        activeSection={activeSection}
        editingItem={editingItem}
        studentForm={studentForm}
        setStudentForm={setStudentForm}
        batchForm={batchForm}
        setBatchForm={setBatchForm}
        attendanceForm={attendanceForm}
        setAttendanceForm={setAttendanceForm}
        feeForm={feeForm}
        setFeeForm={setFeeForm}
        handleStudentSubmit={handleStudentSubmit}
        handleBatchSubmit={handleBatchSubmit}
        handleAttendanceSubmit={handleAttendanceSubmit}
        handleFeeSubmit={handleFeeSubmit}
        loading={loading}
        students={students}
        batches={batches}
        selectedDate={selectedDate}
      />
    </DashboardTemplate>
  )
}

export default HomePage