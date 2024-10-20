// src/components/TagInput.tsx
import { useEffect, useState } from 'react'
import { useSelectedTask } from '../context/SelectedTaskProvider'
import { Colors, Tag } from '../types/tag.entity'
import { TaskService } from '../services/tasks.service'
import { useTasks } from '../context/TaskProvider'

// Definición de los colores disponibles
export const colors = {
  light_gray: 'bg-gray-500',
  gray: 'bg-gray-800',
  brown: 'bg-orange-900',
  orange: 'bg-orange-700',
  yellow: 'bg-yellow-700',
  green: 'bg-green-700',
  blue: 'bg-blue-700',
  purple: 'bg-purple-700',
  pink: 'bg-pink-700',
  red: 'bg-red-700',
}

export const getRandomColor = () => {
  const keys = Object.keys(colors) as Colors[]
  return keys[Math.floor(Math.random() * keys.length)]
}

export const getTagBackgroundColor = (tag: Tag): string => {
  const color = tag.color
  return colors[color] || colors.gray
}

export const TagInput = ({ editable }: { editable: boolean }) => {
  const { tags, setTags } = useSelectedTask()
  const [tagSuggestions, setTagSuggestions] = useState<Tag[]>([])
  const { tasks } = useTasks()

  const handleAddTag = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const input = form.elements.namedItem('tag') as HTMLInputElement

    if (input.value.trim().length > 0) {
      setTags([
        ...tags,
        {
          _id: '',
          name: input.value.trim(),
          color:
            (tagSuggestions.find((e) => e.name == input.value.trim())
              ?.color as Colors) || getRandomColor(),
        },
      ])
      input.value = ''
    }
  }

  useEffect(() => {
    TaskService.getAllTags().then((tags) => {
      setTagSuggestions(tags)
    })
  }, [tasks])

  return (
    <div className="flex flex-col items-start w-full">
      {editable && (
        <form onSubmit={handleAddTag}>
          <input
            type="text"
            name="tag"
            list="tagsList"
            autoComplete="off"
            placeholder="Tag"
            className="bg-gray-950 text-white outline-none px-2 py-1 rounded-md border-2 border-gray-900 mb-2 text-xs"
          />

          <datalist id="tagsList">
            {tagSuggestions.map((tag) => (
              <option key={tag._id} value={tag.name} />
            ))}
          </datalist>
        </form>
      )}
      <div className="flex gap-2 flex-wrap">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={`text-white px-3 rounded-xl ${getTagBackgroundColor(tag)} text-sm`}
          >
            {tag.name}

            {editable && (
              <button
                className="ml-2"
                onClick={() => {
                  setTags(tags.filter((t) => t !== tag))
                }}
              >
                x
              </button>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}
