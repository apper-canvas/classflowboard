import React from 'react'
import FormField from '@/components/molecules/FormField'
import Button from '@/components/atoms/Button'

const AttendanceForm = ({ attendanceForm, setAttendanceForm, handleSubmit, loading, students, batches, closeModal }) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField
        type="select"
        value={attendanceForm.studentId}
        onChange={(e) => setAttendanceForm({...attendanceForm, studentId: e.target.value})}
        options={[{ value: '', label: 'Select Student', disabled: true }, ...students.map(s => ({ value: s.id, label: s.name }))]}
        required
      />
      <FormField
        type="select"
        value={attendanceForm.batchId}
        onChange={(e) => setAttendanceForm({...attendanceForm, batchId: e.target.value})}
        options={[{ value: '', label: 'Select Batch', disabled: true }, ...batches.map(b => ({ value: b.id, label: b.name }))]}
        required
      />
      <FormField
        type="date"
        value={attendanceForm.date}
        onChange={(e) => setAttendanceForm({...attendanceForm, date: e.target.value})}
        required
      />
      <FormField
        type="select"
        value={attendanceForm.status}
        onChange={(e) => setAttendanceForm({...attendanceForm, status: e.target.value})}
        options={[
          { value: 'present', label: 'Present' },
          { value: 'absent', label: 'Absent' },
          { value: 'late', label: 'Late' }
        ]}
        required
      />
      <FormField
        type="textarea"
        placeholder="Remarks (optional)"
        value={attendanceForm.remarks}
        onChange={(e) => setAttendanceForm({...attendanceForm, remarks: e.target.value})}
        rows="2"
      />
      <div className="flex gap-3">
        <Button
          type="button"
          onClick={closeModal}
          className="flex-1 py-3 border border-surface-300 text-surface-700 rounded-lg hover:bg-surface-50"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="flex-1 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50"
        >
          {loading ? 'Recording...' : 'Record Attendance'}
        </Button>
      </div>
    </form>
  )
}

export default AttendanceForm