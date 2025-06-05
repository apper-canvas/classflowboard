import attendanceData from '../mockData/attendance.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class AttendanceService {
  constructor() {
    this.attendance = [...attendanceData]
  }

  async getAll() {
    await delay(300)
    return [...this.attendance]
  }

  async getById(id) {
    await delay(200)
    const record = this.attendance.find(a => a.id === id)
    if (!record) {
      throw new Error('Attendance record not found')
    }
    return { ...record }
  }

  async create(attendanceData) {
    await delay(400)
    const newRecord = {
      ...attendanceData,
      id: Date.now()
    }
    this.attendance.push(newRecord)
    return { ...newRecord }
  }

  async update(id, updateData) {
    await delay(350)
    const index = this.attendance.findIndex(a => a.id === id)
    if (index === -1) {
      throw new Error('Attendance record not found')
    }
    this.attendance[index] = { ...this.attendance[index], ...updateData }
    return { ...this.attendance[index] }
  }

  async delete(id) {
    await delay(250)
    const index = this.attendance.findIndex(a => a.id === id)
    if (index === -1) {
      throw new Error('Attendance record not found')
    }
    this.attendance.splice(index, 1)
    return true
  }

  async getByStudent(studentId) {
    await delay(300)
    return this.attendance.filter(a => a.studentId === studentId)
  }

  async getByBatch(batchId) {
    await delay(300)
    return this.attendance.filter(a => a.batchId === batchId)
  }
}

export default new AttendanceService()