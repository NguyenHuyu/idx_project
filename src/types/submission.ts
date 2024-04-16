export interface Submission_Content_Response {
  id: number
  submitNumber: number
  image: string
  content: string
  prompt: string
  submitTime: string
  isFinal: boolean
}

export interface Submission_Response {
  content: Submission_Content_Response[]
  totalPages: number
  totalElements: number
  size: number
  page: number
  sort: null | any[]
  numberOfElements: number
}
