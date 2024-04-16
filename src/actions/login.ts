'use server'
export async function login(email: string, password: string) {
  const response = await fetch('https://api.siu.edu.vn/ai-paint-contest/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: 'nguyenvana@gmail.com',
      password: '123'
    })
  })
  console.log('response2', response)

  // const data = await response.json()

  // if (response.status === 200) {
  //   return {
  //     status: 200,
  //     message: 'Đăng nhập thành công'
  //   }
  // } else {
  //   const data = await response.json()
  //   return {
  //     status: 409,
  //     message: data.message
  //   }
  // }
}
