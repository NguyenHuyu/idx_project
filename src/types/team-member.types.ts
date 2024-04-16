export interface Team_Member_Content_Response {
  id?: number
  fullName: string
  school: string
  dob: string
  className: string
}

export interface Team_Member_Response {
  content: Team_Member_Content_Response[]
  totalPages: number
  totalElements: number
  size: number
  page: number
  sort: null | any[]
  numberOfElements: number
}
