import { useMemo } from 'react'
import { Task } from '../services/tasks.service'
import { toCapitalizeFirst } from '../utils/texts'
import { useSelectedTask } from '../context/SelectedTaskProvider'
import { LuBadgeCheck } from 'react-icons/lu'

import { convert } from 'html-to-text'

const Priority = ({ level }: { level: 'low' | 'medium' | 'high' }) => {
  const colors = {
    low: 'text-blue-600',
    medium: 'text-yellow-600',
    high: 'text-orange-600',
  }

  return (
    <span
      className={`px-4 text-sm rounded-2xl py-0 ${colors[level]} flex items-center justify-center font-geist font-medium`}
    >
      {toCapitalizeFirst(level)}
    </span>
  )
}

export const colors: string[] = [
  'bg-red-800',
  'bg-yellow-800',
  'bg-green-800',
  'bg-blue-800',
  'bg-indigo-800',
  'bg-purple-800',
  'bg-pink-800',
  'bg-teal-800',
  'bg-orange-800',
  'bg-cyan-800',
  'bg-lime-800',
  'bg-emerald-800',
]

export const getColorByFirstLetter = (tag: string): string => {
  if (!tag || tag.length === 0) return colors[0] // Color por defecto si la etiqueta está vacía

  const firstChar = tag[0].toLowerCase()
  const charCode = firstChar.charCodeAt(0)

  // Verificar si el primer carácter es una letra (a-z)
  if (charCode < 97 || charCode > 122) {
    return colors[0] // Color por defecto si no es una letra
  }

  // Calcular el índice basado en la posición de la letra en el alfabeto
  const index = (charCode - 97) % colors.length
  return colors[index]
}

interface TagWithColorProps {
  tag: string
}

const TagWithColor: React.FC<TagWithColorProps> = ({ tag }) => {
  const colorClass = useMemo(() => getColorByFirstLetter(tag), [tag])

  return (
    <span className={`text-white px-3 text-sm rounded-xl ${colorClass}`}>
      {tag}
    </span>
  )
}

export function TaskItem({ task }: { task: Task }) {
  const { selectedTask, setSelectedTask } = useSelectedTask()

  return (
    <div
      className={`flex flex-col gap-2 px-4 py-2 mx-2 mt-1 hover:bg-gray-900 transition-colors ${
        selectedTask?._id === task._id
          ? 'bg-gray-900 rounded-lg'
          : 'bg-gray-950'
      } shadow-white border-gray-900 cursor-pointer`}
      onClick={(e) => {
        e.preventDefault()
        setSelectedTask(task)
      }}
    >
      <div className="flex flex-row items-start justify-between cursor-pointer w-full">
        <div className="flex flex-col flex-wrap">
          <div className="flex flex-row items-center gap-1">
            {task.done && (
              <LuBadgeCheck className="text-purple-500 min-w-[24px]" />
            )}

            <h2
              className={`text-white font-medium hover:underline ${selectedTask?._id === task._id ? 'underline' : ''} line-clamp-1 max-w-96`}
            >
              {toCapitalizeFirst(convert(task.title, {}))}
            </h2>
          </div>
          <span className="text-gray-400 text-sm italic">
            {new Date(task.createdAt).toLocaleDateString()}
            {' - '}
            {new Date(task.createdAt).toLocaleTimeString()}
          </span>
        </div>
        <div className="flex flex-row gap-2">
          <Priority level={task.priority} />
          <img
            decoding="async"
            src={task.assignedTo?.avatar ?? task.creator.avatar}
            alt="Avatar of creator task"
            className="w-[28px] h-[28px] rounded-full object-cover"
          />
        </div>
      </div>
      <p className="text-gray-400 line-clamp-2 font-primaryBold">
        {convert(task.description, {})}
      </p>
      {task.tags.length > 0 && (
        <div className="flex flex-row gap-2 overflow-x-auto scrollbar-thumb-gray-900 scrollbar-thin py-2 flex-wrap">
          {task.tags.map((tag) => (
            <TagWithColor key={tag} tag={tag} />
          ))}
        </div>
      )}
      {task.links.length > 0 && (
        <div className="flex flex-row gap-2">
          {task.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              className="text-gray-400 hover:underline"
            >
              {link.title}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
