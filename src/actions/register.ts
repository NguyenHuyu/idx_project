'use server'

export async function register(
  email: string,
  password: string,
  fullName: string,
  phone: string,
  convertDateTime: string,
  school: string,
  className: string,
  province: string
) {
  const response = await fetch('https://api.siu.edu.vn/ai-paint-contest/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password,
      fullName,
      phone,
      dob: convertDateTime,
      school,
      className,
      province
    })
  })
  if (response.status === 201) {
    return {
      status: 201,
      message: 'Đăng ký thành công'
    }
  } else {
    const data = await response.json()
    console.log('Register response err', data)
    return {
      status: 409,
      message: data.message
    }
  }
}
