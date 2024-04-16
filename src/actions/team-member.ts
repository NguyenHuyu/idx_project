'use server'
import { Team_Member_Content_Response, Team_Member_Response } from '@/types/team-member.types'
import { revalidateTag } from 'next/cache'
export interface Team_Member_Response_Update extends Team_Member_Content_Response {
  userID?: string
}
export interface Team_Member_Content_Response_Create extends Team_Member_Content_Response {
  lang: string
}

const API = 'https://api.siu.edu.vn/ai-paint-contest/team-member'

export async function getTeamMemberDetail(id: string): Promise<Team_Member_Content_Response> {
  const response = await fetch(`${API}/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-cache',
    next: {
      tags: ['getTeamMemberDetail']
    }
  })
  const data = await response.json()
  return data
}

export async function updateTeamMember({ className, dob, fullName, school, id, userID }: Team_Member_Response_Update) {
  const response = await fetch(`${API}/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-cache',
    method: 'PUT',
    body: JSON.stringify({
      className,
      dob,
      fullName,
      school,
      user: {
        id: userID
      }
    })
  })

  if (response.status === 200) {
    revalidateTag('getTeamMemberDetail')
    revalidateTag('user-id')
    return {
      message: 'Thêm thành công',
      status: 200
    }
  } else {
    const data = await response.json()
    return {
      message: data.message,
      status: 400
    }
  }
}

export async function getTeamMembers(): Promise<Team_Member_Response> {
  const response = await fetch(`${API}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json()
  return data
}

export async function createTeamMember({
  className,
  dob,
  fullName,
  school,
  id,
  lang
}: Team_Member_Content_Response_Create) {
  const response = await fetch(`${API}`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': lang === 'vi' ? 'vi-VN' : 'en-US'
    },
    method: 'POST',
    body: JSON.stringify({
      className,
      dob,
      fullName,
      school,
      user: {
        id: id
      }
    })
  })
  if (response.status === 201) {
    revalidateTag('user-id')
    revalidateTag('user')
    return {
      message: 'Thêm thành công',
      status: 201
    }
  } else {
    const data = await response.json()
    return {
      message: data.message,
      status: 400
    }
  }
}

export async function deleteTeamMember(id: string) {
  const response = await fetch(`${API}/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-cache',
    method: 'DELETE'
  })
  revalidateTag('user-id')

  if (response.status === 200) {
    return {
      message: 'Xóa thành công',
      status: 200
    }
  } else {
    const data = await response.json()
    return {
      message: data.message,
      status: 400
    }
  }
}
