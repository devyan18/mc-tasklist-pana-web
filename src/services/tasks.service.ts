import { ICreateTag, Tag } from '../types/tag.entity'
import { User } from '../types/user.entity'
import { HOST_URL } from '../utils/constants'
import { Item } from './item.service'

export type Task = {
  _id: string
  title: string
  description: string
  done: boolean
  tags: Tag[]
  creator: User
  priority: 'low' | 'medium' | 'high'
  items: Item[]
  links: {
    title: string
    url: string
  }[]
  assignedTo?: User
  createdAt: string
  updatedAt: string
}

export class TaskService {
  static async getTasks() {
    const response = await fetch(`${HOST_URL}/tasks`, {
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch tasks')
    }

    const data = await response.json()

    return data as Task[]
  }

  static async createTask(data: {
    title: string
    description: string
    priority: 'low' | 'medium' | 'high'
    tags: ICreateTag[]
  }) {
    const response = await fetch(`${HOST_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Failed to create task')
    }

    return (await response.json()) as Task
  }

  static async updateTask(taskId: string, data: Partial<Task>) {
    const response = await fetch(`${HOST_URL}/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Failed to update task')
    }

    return (await response.json()) as Task
  }

  static async getById(taskId: string) {
    const response = await fetch(`${HOST_URL}/tasks/${taskId}`, {
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch task')
    }

    return (await response.json()) as Task
  }

  static async deleteTask(taskId: string) {
    const response = await fetch(`${HOST_URL}/tasks/${taskId}`, {
      method: 'DELETE',
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Failed to delete task')
    }

    return true
  }

  static async getAllTags() {
    const response = await fetch(`${HOST_URL}/tags`, {
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch tags')
    }

    const { tags } = await response.json()

    return tags as Tag[]
  }

  static async changeTagColor(tagId: string, color: string) {
    const response = await fetch(`${HOST_URL}/tags/${tagId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ color }),
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Failed to change tag color')
    }

    return true
  }

  static async changeTagName(tagId: string, name: string) {
    const response = await fetch(`${HOST_URL}/tags/${tagId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Failed to change tag name')
    }

    return true
  }
}
