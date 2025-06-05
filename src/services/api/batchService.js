import batchData from '../mockData/batches.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class BatchService {
  constructor() {
    this.batches = [...batchData]
  }

  async getAll() {
    await delay(300)
    return [...this.batches]
  }

  async getById(id) {
    await delay(200)
    const batch = this.batches.find(b => b.id === id)
    if (!batch) {
      throw new Error('Batch not found')
    }
    return { ...batch }
  }

  async create(batchData) {
    await delay(400)
    const newBatch = {
      ...batchData,
      id: Date.now(),
      studentIds: batchData.studentIds || [],
      capacity: parseInt(batchData.capacity),
      fees: parseFloat(batchData.fees)
    }
    this.batches.push(newBatch)
    return { ...newBatch }
  }

  async update(id, updateData) {
    await delay(350)
    const index = this.batches.findIndex(b => b.id === id)
    if (index === -1) {
      throw new Error('Batch not found')
    }
    this.batches[index] = { ...this.batches[index], ...updateData }
    return { ...this.batches[index] }
  }

  async delete(id) {
    await delay(250)
    const index = this.batches.findIndex(b => b.id === id)
    if (index === -1) {
      throw new Error('Batch not found')
    }
    this.batches.splice(index, 1)
    return true
  }
}

export default new BatchService()