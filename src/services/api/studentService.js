import studentData from '../mockData/students.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class StudentService {
  constructor() {
    this.students = [...studentData]
  }

  async getAll() {
    await delay(300)
    return [...this.students]
  }

  async getById(id) {
    await delay(200)
    const student = this.students.find(s => s.id === id)
    if (!student) {
      throw new Error('Student not found')
    }
    return { ...student }
  }

  async create(studentData) {
    await delay(400)
    const newStudent = {
      ...studentData,
      id: Date.now(),
      enrollmentDate: studentData.enrollmentDate || new Date().toISOString().split('T')[0],
      batchIds: studentData.batchIds || [],
      status: studentData.status || 'active'
    }
    this.students.push(newStudent)
    return { ...newStudent }
  }

  async update(id, updateData) {
    await delay(350)
    const index = this.students.findIndex(s => s.id === id)
    if (index === -1) {
      throw new Error('Student not found')
    }
    this.students[index] = { ...this.students[index], ...updateData }
    return { ...this.students[index] }
  }

  async delete(id) {
    await delay(250)
    const index = this.students.findIndex(s => s.id === id)
    if (index === -1) {
      throw new Error('Student not found')
    }
    this.students.splice(index, 1)
    return true
  }
}

export default new StudentService()