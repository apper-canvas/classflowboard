import React from 'react'
import FormField from '@/components/molecules/FormField'
import Button from '@/components/atoms/Button'

const BatchForm = ({ batchForm, setBatchForm, handleSubmit, loading, editingItem, closeModal }) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField
        type="text"
        placeholder="Batch Name"
        value={batchForm.name}
        onChange={(e) => setBatchForm({...batchForm, name: e.target.value})}
        required
      />
      <FormField
        type="text"
        placeholder="Subject"
        value={batchForm.subject}
        onChange={(e) => setBatchForm({...batchForm, subject: e.target.value})}
        required
      />
      <FormField
        type="text"
        placeholder="Schedule (e.g., Mon-Fri 10:00-12:00)"
        value={batchForm.schedule}
        onChange={(e) => setBatchForm({...batchForm, schedule: e.target.value})}
        required
      />
      <FormField
        type="number"
        placeholder="Capacity"
        value={batchForm.capacity}
        onChange={(e) => setBatchForm({...batchForm, capacity: e.target.value})}
        required
      />
      <FormField
        type="number"
        placeholder="Monthly Fees"
        value={batchForm.fees}
        onChange={(e) => setBatchForm({...batchForm, fees: e.target.value})}
        required
      />
      <FormField
        type="date"
        placeholder="Start Date"
        value={batchForm.startDate}
        onChange={(e) => setBatchForm({...batchForm, startDate: e.target.value})}
        required
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
          {loading ? 'Saving...' : editingItem ? 'Update' : 'Create'} Batch
        </Button>
      </div>
    </form>
  )
}

export default BatchForm