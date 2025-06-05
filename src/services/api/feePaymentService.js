import feePaymentData from '../mockData/feePayments.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class FeePaymentService {
  constructor() {
    this.feePayments = [...feePaymentData]
  }

  async getAll() {
    await delay(300)
    return [...this.feePayments]
  }

  async getById(id) {
    await delay(200)
    const payment = this.feePayments.find(f => f.id === id)
    if (!payment) {
      throw new Error('Fee payment not found')
    }
    return { ...payment }
  }

  async create(feePaymentData) {
    await delay(400)
    const newPayment = {
      ...feePaymentData,
      id: Date.now(),
      amount: parseFloat(feePaymentData.amount)
    }
    this.feePayments.push(newPayment)
    return { ...newPayment }
  }

  async update(id, updateData) {
    await delay(350)
    const index = this.feePayments.findIndex(f => f.id === id)
    if (index === -1) {
      throw new Error('Fee payment not found')
    }
    this.feePayments[index] = { ...this.feePayments[index], ...updateData }
    return { ...this.feePayments[index] }
  }

  async delete(id) {
    await delay(250)
    const index = this.feePayments.findIndex(f => f.id === id)
    if (index === -1) {
      throw new Error('Fee payment not found')
    }
    this.feePayments.splice(index, 1)
    return true
  }

  async getByStudent(studentId) {
    await delay(300)
    return this.feePayments.filter(f => f.studentId === studentId)
  }

  async getOverdue() {
    await delay(300)
    const today = new Date().toISOString().split('T')[0]
    return this.feePayments.filter(f => f.status === 'pending' && f.dueDate < today)
  }
}

export default new FeePaymentService()