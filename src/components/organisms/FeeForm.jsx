import React from 'react'
import FormField from '@/components/molecules/FormField'
import Button from '@/components/atoms/Button'

const FeeForm = ({ feeForm, setFeeForm, handleSubmit, loading, students, batches, closeModal }) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField
        type="select"
        value={feeForm.studentId}
        onChange={(e) => setFeeForm({...feeForm, studentId: e.target.value})}
        options={[{ value: '', label: 'Select Student', disabled: true }, ...students.map(s => ({ value: s.id, label: s.name }))]}
        required
      />
      <FormField
        type="select"
        value={feeForm.batchId}
        onChange={(e) => setFeeForm({...feeForm, batchId: e.target.value})}
        options={[{ value: '', label: 'Select Batch', disabled: true }, ...batches.map(b => ({ value: b.id, label: b.name }))]}
        required
      />
      <FormField
        type="number"
        placeholder="Amount"
        value={feeForm.amount}
        onChange={(e) => setFeeForm({...feeForm, amount: e.target.value})}
        required
      />
      <FormField
        type="date"
        placeholder="Due Date"
        value={feeForm.dueDate}
        onChange={(e) => setFeeForm({...feeForm, dueDate: e.target.value})}
        required
      />
      <FormField
        type="date"
        placeholder="Paid Date"
        value={feeForm.paidDate}
        onChange={(e) => setFeeForm({...feeForm, paidDate: e.target.value})}
      />
      <FormField
        type="select"
        value={feeForm.status}
        onChange={(e) => setFeeForm({...feeForm, status: e.target.value})}
        options={[
          { value: 'pending', label: 'Pending' },
          { value: 'paid', label: 'Paid' },
          { value: 'overdue', label: 'Overdue' }
        ]}
        required
      />
      <FormField
        type="select"
        value={feeForm.paymentMode}
        onChange={(e) => setFeeForm({...feeForm, paymentMode: e.target.value})}
        options={[
          { value: 'cash', label: 'Cash' },
          { value: 'online', label: 'Online' },
          { value: 'cheque', label: 'Cheque' }
        ]}
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
          {loading ? 'Recording...' : 'Record Payment'}
        </Button>
      </div>
    </form>
  )
}

export default FeeForm