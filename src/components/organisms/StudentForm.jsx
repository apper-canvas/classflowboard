import React from 'react'
import FormField from '@/components/molecules/FormField'
import Button from '@/components/atoms/Button'

const StudentForm = ({ studentForm, setStudentForm, handleSubmit, loading, editingItem, closeModal }) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField
        type="text"
        placeholder="Full Name"
        value={studentForm.name}
        onChange={(e) => setStudentForm({...studentForm, name: e.target.value})}
        required
      />
      <FormField
        type="email"
        placeholder="Email"
        value={studentForm.email}
        onChange={(e) => setStudentForm({...studentForm, email: e.target.value})}
        required
      />
      <FormField
        type="tel"
        placeholder="Phone Number"
        value={studentForm.phone}
        onChange={(e) => setStudentForm({...studentForm, phone: e.target.value})}
        required
      />
      <FormField
        type="tel"
        placeholder="Parent Phone"
        value={studentForm.parentPhone}
        onChange={(e) => setStudentForm({...studentForm, parentPhone: e.target.value})}
      />
      <FormField
        type="textarea"
        placeholder="Address"
        value={studentForm.address}
        onChange={(e) => setStudentForm({...studentForm, address: e.target.value})}
        rows="3"
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
          {loading ? 'Saving...' : editingItem ? 'Update' : 'Add'} Student
        </Button>
      </div>
    </form>
  )
}

export default StudentForm