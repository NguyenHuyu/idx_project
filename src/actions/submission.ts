'use server'

import { Submission_Content_Response, Submission_Response } from '@/types/submission'
import { revalidateTag } from 'next/cache'

export async function submission(formData: any) {
  const response = await fetch('https://api.siu.edu.vn/ai-paint-contest/submission', {
    method: 'POST',
    body: formData,
    cache: 'no-cache'
  })

  if (response.status === 201) {
    revalidateTag('getSubmissions')
    revalidateTag('getSubmissionID')
    revalidateTag('user-id')
    revalidateTag('user')

    return {
      status: 201,
      message: 'Nộp bài thành công'
    }
  } else {
    const data = await response.json()
    return {
      status: 409,
      message: data.message
    }
  }
}

export async function getSubmissions(searchParams: any): Promise<Submission_Response> {
  if (Object.keys(searchParams).length === 0) {
    const response = await fetch('https://api.siu.edu.vn/ai-paint-contest/submission', {
      headers: {
        'Content-Type': 'application/json'
      },
      next: {
        tags: ['getSubmissions'],
        revalidate: 10
      }
    })
    const data = await response.json()
    return data
  } else {
    const response = await fetch(
      `https://api.siu.edu.vn/ai-paint-contest/submission/search?isFinal=true&page=${searchParams?.page}`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        next: {
          tags: ['getSubmissions']
        }
      }
    )
    const data = await response.json()
    return data
  }
}

export async function getSubmissionID(id: string): Promise<Submission_Content_Response> {
  const response = await fetch(`https://api.siu.edu.vn/ai-paint-contest/submission/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    next: {
      tags: ['getSubmissionID']
    }
  })
  const data = await response.json()
  return data
}

export async function updateSubmissionByID({ ...formData }) {
  const response = await fetch(`https://api.siu.edu.vn/ai-paint-contest/submission/${formData.id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-cache',
    method: 'PUT',
    body: JSON.stringify(formData)
  })

  if (response.status === 200) {
    revalidateTag('getSubmissions')
    revalidateTag('getSubmissionID')
    return {
      message: 'Cập thành công',
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

export async function updateSubmissionByCheckBox({ ...formData }) {
  const response = await fetch(`https://api.siu.edu.vn/ai-paint-contest/submission/${formData.id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-cache',
    method: 'PUT',
    body: JSON.stringify(formData)
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
