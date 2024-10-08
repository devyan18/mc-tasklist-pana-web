import { useEffect, useState } from 'react'
import { TaskService } from '../services/tasks.service'
import { TaskItem } from './TaskItem'
import { useTasks } from '../context/TaskProvider'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { MdOutlineCreateNewFolder } from 'react-icons/md'
import { useModal } from '../hooks/useModal'
import { Modal } from './Modal'
import { CreateNewTaskForm } from './CreateNewTaskForm'
import { toCapitalize } from '../utils/texts'
import { useSession } from '../context/SessionProvider'

export const TaskList = () => {
  const { user } = useSession()
  const { value: viewCompletes, setValue: setViewCompletes } =
    useLocalStorage<boolean>('view-completes', true)
  const { tasks, setTasks } = useTasks()
  const [searchFilter, setSearchFilter] = useState<string>('')
  const { close, isOpen, open } = useModal()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(e.target.value)
  }

  const filteredTasks = tasks.filter((task) => {
    if (!viewCompletes && task.done) {
      return false
    }

    return (
      task.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      task.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
      task.priority.toLowerCase().includes(searchFilter.toLowerCase()) ||
      task.creator.username
        .toLowerCase()
        .includes(searchFilter.toLowerCase()) ||
      task.tags.some((tag) =>
        tag.toLowerCase().includes(searchFilter.toLowerCase()),
      ) ||
      (searchFilter === 'done' && task.done && !viewCompletes)
    )
  })

  useEffect(() => {
    TaskService.getTasks()
      .then((data) => setTasks(data))
      .catch((err) => console.error(err))
  }, [setTasks])

  return (
    <div className="text-white w-1/3 flex flex-col gap-1 overflow-hidden">
      <Modal isOpen={isOpen} onClose={close}>
        <CreateNewTaskForm onClose={close} />
      </Modal>
      <div className="flex flex-row gap-4 items-center pl-4 pb-5">
        <img
          decoding="async"
          src={user?.avatar}
          alt="User avatar"
          className="w-[42px] h-[42px] rounded-md object-cover"
        />
        <span className="text-white/80 font-bold text-lg">
          {toCapitalize(user!.username)}
        </span>
      </div>
      <div className="flex flex-row gap-4 items-center w-full">
        <h2 className="text-2xl pl-3 font-geist font-bold">Tasks</h2>
        <div className="flex flex-row items-center gap-2 w-full">
          <input
            type="checkbox"
            name="view-completed"
            id="view-completed"
            className="cursor-pointer"
            checked={viewCompletes}
            onChange={() => setViewCompletes(!viewCompletes)}
          />
          <label className="cursor-pointer font-geist" htmlFor="view-completed">
            View completed
          </label>
        </div>
        <button
          className="hover:bg-gray-900 text-white rounded-md p-2 self-end mr-2"
          onClick={(e) => {
            e.preventDefault()
            open()
          }}
        >
          <MdOutlineCreateNewFolder />
        </button>
      </div>
      <input
        className="bg-gray-950 outline-none px-2 py-1 rounded-md border-2 border-gray-900 mx-2"
        type="search"
        name="filter-task"
        onChange={handleSearch}
        placeholder="Search for tasks..."
      />
      <div className=" scrollbar-track-gray-950 overflow-auto  scrollbar-thumb-gray-900 scrollbar-thin">
        {filteredTasks.length === 0 && (
          <div className="flex flex-row gap-2 items-center justify-center mt-4">
            <span className="text-center text-gray-400">No tasks found</span>
            <button
              className="hover:bg-gray-900 text-white rounded-md p-2"
              onClick={(e) => {
                e.preventDefault()
                open()
              }}
            >
              <MdOutlineCreateNewFolder />
            </button>
          </div>
        )}
        {filteredTasks.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </div>
    </div>
  )
}
