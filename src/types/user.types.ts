import { Submission_Content_Response } from './submission'
import { Team_Member_Content_Response } from './team-member.types'

export interface User_Content_Response {
  id: number
  fullName: string
  password?: string
  email: string
  phone: string
  school: string
  dob: string
  className: string
  province: string
  teamMembers: Team_Member_Content_Response[]
  submissions: Submission_Content_Response[]
  isAdmin?: boolean
}

export interface User_Response {
  content: User_Content_Response[]
  totalPages: number
  totalElements: number
  size: number
  page: number
  sort: null | any[]
  numberOfElements: number
}
