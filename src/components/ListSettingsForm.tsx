import { useState } from 'react'

type Props = {
  onClose: () => void
  viewCompletes: boolean
  setViewCompletes: (viewCompletes: boolean) => void
}

export const ListSettingsForm = (props: Props) => {
  const [viewCompletes, setViewCompletes] = useState(props.viewCompletes)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    props.setViewCompletes(viewCompletes)
    props.onClose()
  }
  return (
    <form className="flex flex-col w-[380px]" onSubmit={handleSubmit}>
      <h2 className="font-bold text-lg">Setup Task List</h2>
      <span className="font-medium mt-2">Visualization:</span>
      <div className="ml-4 mb-2">
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
            View <span className="text-red-600">High</span> Priority Tasks?
          </label>
        </div>
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
            View <span className="text-yellow-600">Medium</span> Priority Tasks?
          </label>
        </div>
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
            View <span className="text-blue-600">Low</span> Priority Tasks?
          </label>
        </div>
      </div>

      <span className="font-medium mt-2">Order:</span>

      <div className="flex flex-row justify-between mt-6">
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
