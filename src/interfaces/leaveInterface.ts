export interface Holiday {
  id: number,
  employeeId: number,
  subject: string,
  startDate: Date,
  endDate: Date,
  approved: boolean,
  leaveReason: string
}