import { HOST_URL } from '../utils/constants'

export type Item = {
  _id?: string
  id: string
  name: string
  mod: string
  image: string
}

export class ItemService {
  static async getItems({
    page = 1,
    limit = 10,
  }: {
    page?: number
    limit?: number
  }) {
    const response = await fetch(
      `${HOST_URL}/items?page=${page}&limit=${limit}`,
    )

    if (!response.ok) {
      throw new Error('Failed to fetch items')
    }

    const data = await response.json()

    return data.map((item: Item) => ({
      ...item,
      id: item._id!.toString(),
    }))
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
