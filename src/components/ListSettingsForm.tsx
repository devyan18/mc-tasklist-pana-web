import { useEffect, useState } from 'react'
import { Colors, Tag } from '../types/tag.entity'
import { useTasks } from '../context/TaskProvider'
import { TaskService } from '../services/tasks.service'
import { colors, getTagBackgroundColor } from './TagInput'
import { TagSettingsItem } from './TagSettingsItem'

type Props = {
  onClose: () => void
  viewCompletes: boolean
  setViewCompletes: (viewCompletes: boolean) => void
  viewHighPriority: boolean
  setViewHighPriority: (viewHighPriority: boolean) => void
  viewMediumPriority: boolean
  setViewMediumPriority: (viewMediumPriority: boolean) => void
  viewLowPriority: boolean
  setViewLowPriority: (viewLowPriority: boolean) => void
}

export const ListSettingsForm = (props: Props) => {
  const [viewCompletes, setViewCompletes] = useState(props.viewCompletes)
  const [viewHighPriority, setViewHighPriority] = useState(
    props.viewHighPriority,
  )
  const [viewMediumPriority, setViewMediumPriority] = useState(
    props.viewMediumPriority,
  )
  const [viewLowPriority, setViewLowPriority] = useState(props.viewLowPriority)
  const [tagList, setTagList] = useState<Tag[]>([])
  const { tasks } = useTasks()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    props.setViewCompletes(viewCompletes)
    props.setViewHighPriority(viewHighPriority)
    props.setViewMediumPriority(viewMediumPriority)
    props.setViewLowPriority(viewLowPriority)
    props.onClose()
  }

  useEffect(() => {
    TaskService.getAllTags().then((tags) => {
      setTagList(tags)
    })
  }, [tasks])

  return (
    <form
      className="flex flex-col w-[380px] min-h-[500px] max-h-[560px]"
      onSubmit={handleSubmit}
    >
      <h2 className="font-bold text-lg">Setup Task List</h2>
      <span className="font-medium mt-2">Visualization:</span>
      <div className="ml-4 mb-2">
        {/* View Completes */}
        <div className="flex flex-row gap-2 items-center">
          <input
            type="checkbox"
            className="cursor-pointer"
            id="view-completed-tasks"
            checked={viewCompletes}
            onChange={() => setViewCompletes(!viewCompletes)}
          />
          <label
            htmlFor="view-completed-tasks"
            className="text-white/85 select-none cursor-pointer"
          >
            View <span className="text-purple-500">Completed</span> Tasks?
          </label>
        </div>
        {/* View High Priority */}
        <div className="flex flex-row gap-2 items-center">
          <input
            type="checkbox"
            className="cursor-pointer"
            id="view-high-priority-tasks"
            checked={viewHighPriority}
            onChange={() => setViewHighPriority(!viewHighPriority)}
          />
          <label
            htmlFor="view-high-priority-tasks"
            className="text-white/85 select-none cursor-pointer"
          >
            View <span className="text-red-600">High</span> Priority Tasks?
          </label>
        </div>
        {/* View Medium Priority */}
        <div className="flex flex-row gap-2 items-center">
          <input
            type="checkbox"
            className="cursor-pointer"
            id="view-medium-priority-tasks"
            checked={viewMediumPriority}
            onChange={() => setViewMediumPriority(!viewMediumPriority)}
          />
          <label
            htmlFor="view-medium-priority-tasks"
            className="text-white/85 select-none cursor-pointer"
          >
            View <span className="text-yellow-600">Medium</span> Priority Tasks?
          </label>
        </div>
        {/* View Low Priority */}
        <div className="flex flex-row gap-2 items-center">
          <input
            type="checkbox"
            className="cursor-pointer"
            id="view-low-priority-tasks"
            checked={viewLowPriority}
            onChange={() => setViewLowPriority(!viewLowPriority)}
          />
          <label
            htmlFor="view-low-priority-tasks"
            className="text-white/85 select-none cursor-pointer"
          >
            View <span className="text-blue-600">Low</span> Priority Tasks?
          </label>
        </div>
      </div>

      <span className="font-medium my-2">Tags:</span>

      {/* <input type="search" name="tag" id="" /> */}
      <div className="flex flex-col gap-1 items-start overflow-y-auto flex-1">
        {tagList.map((tag, index) => (
          <TagSettingsItem
            index={index}
            key={tag._id}
            tag={tag}
            colors={Object.keys(colors).map((e) => ({
              text: e,
              bg: getTagBackgroundColor({
                name: tag.name,
                color: e as Colors,
              }),
            }))}
          />
        ))}
      </div>

      <div className="flex flex-row justify-between mt-auto">
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
          Save
        </button>
      </div>
    </form>
  )
}
