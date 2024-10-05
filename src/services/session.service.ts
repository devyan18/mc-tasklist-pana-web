import { HOST_URL } from '../utils/constants'

export class SessionService {
  static async getMe() {
    const response = await fetch(`${HOST_URL}/auth/me`, {
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch user')
    }

    return response.json()
  }

  static async signIn(data: { email: string; password: string }) {
    const response = await fetch(`${HOST_URL}/auth/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Failed to login')
    }

    return response.json()
  }

  static async signUp(data: {
    username: string
    email: string
    password: string
    avatar: File | null
  }) {
    const formData = new FormData()

    formData.append('username', data.username)
    formData.append('email', data.email)
    formData.append('password', data.password)

    if (data.avatar) {
      formData.append('avatar', data.avatar)
    }

    const response = await fetch(`${HOST_URL}/auth/sign-up`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Failed to sign up')
    }

    return response.json()
  }
}
