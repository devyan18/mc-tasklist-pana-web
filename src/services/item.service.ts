import { HOST_URL } from '../utils/constants'

export type Item = {
  id: string
  name: string
  mod: string
  image: string
}

export class ItemService {
  static async getItems() {
    const response = await fetch(`${HOST_URL}/items`, {
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch items')
    }

    const data = await response.json()

    return data as Item[]
  }

  static async createItem(data: {
    name: string
    description: string
    creator: string
    priority: 'low' | 'medium' | 'high'
    tags: string[]
    links: {
      title: string
      url: string
    }[]
  }) {
    const response = await fetch(`${HOST_URL}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Failed to create item')
    }

    return (await response.json()) as Item
  }
}
