'use server'

import { User_Content_Response, User_Response } from '@/types/user.types'
import { revalidateTag } from 'next/cache'

const API = 'https://api.siu.edu.vn/ai-paint-contest/user'

export async function getUserInfo(): Promise<User_Response> {
  const response = await fetch(API, {
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-cache',
    next: {
      tags: ['user']
    }
  })
  const data = await response.json()
  return data
}

export async function getUserInfoByIsFinal(): Promise<User_Response> {
  const response = await fetch(`${API}/searc`, {
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-cache',
    next: {
      tags: ['user']
    }
  })
  const data = await response.json()
  return data
}

export async function getUserInfoDetail(id: string): Promise<User_Content_Response> {
  const response = await fetch(`${API}/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-cache',
    next: {
      tags: ['user-id']
    }
  })
  const data = await response.json()
  return data
}

export async function updateUserInfo({ ...formData }: Omit<User_Content_Response, 'teamMembers' | 'submissions'>) {
  const response = await fetch(`${API}/${formData.id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-cache',
    method: 'PUT',
    body: JSON.stringify(formData)
  })
  if (response.status === 200) {
    revalidateTag('user-id')
    revalidateTag('user')
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
