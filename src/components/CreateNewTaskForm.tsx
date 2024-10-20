import { useEffect, useState } from 'react'
import { getRandomColor, getTagBackgroundColor } from './TagInput'
import { TaskService } from '../services/tasks.service'
import { toast } from 'react-hot-toast'
import { useTasks } from '../context/TaskProvider'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z, { string } from 'zod'
import { Colors, Tag } from '../types/tag.entity'

type Props = {
  onClose: () => void
}

type ICreateTask = {
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
}

const createTaskSchema = z.object({
  title: string().min(3, 'Title must be at least 3 characters long'),
  description: string().min(
    6,
    'Description must be at least 6 characters long',
  ),
  priority: z.enum(['low', 'medium', 'high']),
})

export const CreateNewTaskForm = (props: Props) => {
  const [tags, setTags] = useState<Tag[]>([])
  const { tasks } = useTasks()
  const [tagSuggestions, setTagSuggestions] = useState<Tag[]>([])
  const { sincronize } = useTasks()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICreateTask>({
    resolver: zodResolver(createTaskSchema),
  })

  const onSubmit = async (data: ICreateTask) => {
    try {
      await TaskService.createTask({
        ...data,
        tags,
      })
      toast.success('Task created')
      props.onClose()
      sincronize()
      reset() // Limpiar el formulario
      setTags([]) // Limpiar las etiquetas
    } catch (err) {
      console.error(err)
      toast.error('Failed to create task')
    }
  }

  useEffect(() => {
    TaskService.getAllTags().then((tags) => {
      setTagSuggestions(tags)
    })
  }, [tasks])

  return (
    <form
      className="flex flex-col gap-4 w-[380px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="font-bold text-lg">Make a new Task</h2>

      <div className="flex flex-col">
        <label htmlFor="title" className="text-sm">
          Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="Get 100 of ancient debris"
          className="bg-gray-950 text-white outline-none px-2 py-1 rounded-md border-2 border-gray-900 mb-2 text-xs"
          {...register('title')}
        />
        {errors.title && (
          <span className="text-red-500 text-xs">{errors.title.message}</span>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="description" className="text-sm">
          Description
        </label>
        <textarea
          id="description"
          placeholder="I need to get 100 ancient debris to make a full set of netherite armor"
          className="bg-gray-950 text-white outline-none px-2 py-1 rounded-md border-2 border-gray-900 mb-2 text-xs"
          {...register('description')}
        ></textarea>
        {errors.description && (
          <span className="text-red-500 text-xs">
            {errors.description.message}
          </span>
        )}
      </div>

      <div className="flex flex-row gap-2 items-center">
        <label htmlFor="priority" className="text-sm">
          Priority
        </label>
        <select
          id="priority"
          defaultValue={'low'}
          className="bg-gray-950 text-white outline-none px-2 py-1 rounded-md border-2 border-gray-900 text-xs"
          {...register('priority')}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        {errors.priority && (
          <span className="text-red-500 text-xs">
            {errors.priority.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="tags" className="text-sm mb-1">
          Tags{' '}
          <span
            className=" text-xs text-gray-400
          "
          >
            (press Enter to add)
          </span>
        </label>
        <input
          type="text"
          name="tag"
          autoComplete="off"
          list="tagsList"
          onKeyDownCapture={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              const input = e.target as HTMLInputElement
              if (input.value.trim()?.length > 0) {
                setTags([
                  ...tags,
                  {
                    name: input.value.trim(),
                    color:
                      (tagSuggestions.find((e) => e.name == input.value.trim())
                        ?.color as Colors) || getRandomColor(),
                  },
                ])
                input.value = ''
              }
            }
          }}
          placeholder="Minecraft; Netherite; Ancient Debris"
          className="bg-gray-950 text-white outline-none px-2 py-1 rounded-md border-2 border-gray-900 mb-2 text-xs"
        />
      </div>

      <datalist id="tagsList">
        {tagSuggestions?.map((tag) => (
          <option key={tag._id} value={tag.name} />
        ))}
      </datalist>

      <div className="flex flex-row flex-wrap">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={`text-white px-3 rounded-xl ${getTagBackgroundColor(tag)} text-sm`}
          >
            {tag.name}
            <button
              className="ml-2"
              onClick={() => {
                setTags(tags.filter((t) => t !== tag))
              }}
            >
              x
            </button>
          </span>
        ))}
      </div>

      <div className="flex flex-row justify-between">
        <button
          type="button"
          className="bg-gray-900 text-white font-geist font-bold py-1 px-4 rounded-xl hover:bg-gray-950 text-xs"
          onClick={props.onClose}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="bg-purple-800 text-white font-geist font-bold py-1 px-4 rounded-xl hover:bg-gray-950 text-xs"
        >
          Create
        </button>
      </div>
    </form>
  )
}
