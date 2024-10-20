import { Task } from '../services/tasks.service'
import { toCapitalizeFirst } from '../utils/texts'
import { useSelectedTask } from '../context/SelectedTaskProvider'
import { LuBadgeCheck } from 'react-icons/lu'

import { convert } from 'html-to-text'
import { getTagBackgroundColor } from './TagInput'
import { Tag } from '../types/tag.entity'
import { useEffect, useState } from 'react'

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

interface TagWithColorProps {
  tag: Tag
}

type TimeAgoProps = {
  timestamp: Date
  locale?: string
}

const timeAgo = (timestamp: Date, locale: string = 'en'): string => {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000)

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })

  const units = [
    { unit: 'year', value: 60 * 60 * 24 * 365 },
    { unit: 'month', value: 60 * 60 * 24 * 30 },
    { unit: 'day', value: 60 * 60 * 24 },
    { unit: 'hour', value: 60 * 60 },
    { unit: 'minute', value: 60 },
    { unit: 'second', value: 1 },
  ]

  for (const { unit, value } of units) {
    const elapsed = Math.floor(diffInSeconds / value)
    if (elapsed > 0) {
      return rtf.format(-elapsed, unit as Intl.RelativeTimeFormatUnit)
    }
  }

  return rtf.format(0, 'second')
}

const TimeAgo: React.FC<TimeAgoProps> = ({ timestamp, locale = 'en' }) => {
  const [timeAgoText, setTimeAgoText] = useState<string>(() =>
    timeAgo(timestamp, locale),
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgoText(timeAgo(timestamp, locale))
    }, 30000) // Actualiza cada 30 segundos

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(interval)
  }, [timestamp, locale])

  return <span>{timeAgoText}</span>
}

export default TimeAgo

const TagWithColor: React.FC<TagWithColorProps> = ({ tag }) => {
  return (
    <span
      className={`text-white px-3 text-sm rounded-xl ${getTagBackgroundColor(tag)}`}
    >
      {tag.name}
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
              className={`font-medium hover:underline ${selectedTask?._id === task._id ? 'text-white' : 'text-white/75'} line-clamp-1 max-w-96`}
            >
              {toCapitalizeFirst(convert(task.title, {}))}
            </h2>
          </div>
          <span className="text-gray-400 text-xs italic">
            <TimeAgo timestamp={new Date(task.updatedAt)} />
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
      {task.tags?.length > 0 && (
        <div className="flex flex-row gap-2 overflow-x-auto scrollbar-thumb-gray-900 scrollbar-thin py-2 flex-wrap">
          {task.tags.map((tag) => (
            <TagWithColor key={tag._id} tag={tag} />
          ))}
        </div>
      )}
      {task.links?.length > 0 && (
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
