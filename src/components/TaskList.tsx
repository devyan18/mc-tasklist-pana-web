import { useEffect, useState } from 'react'
import { TaskService } from '../services/tasks.service'
import { TaskItem } from './TaskItem'
import { useTasks } from '../context/TaskProvider'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { HiFolderAdd } from 'react-icons/hi'

// import { IoCreateOutline } from 'react-icons/md'
import { useModal } from '../hooks/useModal'
import { Modal } from './Modal'
import { CreateNewTaskForm } from './CreateNewTaskForm'
import { TbSettingsFilled } from 'react-icons/tb'
import { ListSettingsForm } from './ListSettingsForm'

export const TaskList = () => {
  const { value: viewCompletes, setValue: setViewCompletes } =
    useLocalStorage<boolean>('view-completes', true)
  const { tasks, setTasks } = useTasks()
  const [searchFilter, setSearchFilter] = useState<string>('')
  const { value: viewHighPriority, setValue: setViewHighPriority } =
    useLocalStorage('view-high-priority', true)
  const { value: viewMediumPriority, setValue: setViewMediumPriority } =
    useLocalStorage('view-medium-priority', true)
  const { value: viewLowPriority, setValue: setViewLowPriority } =
    useLocalStorage('view-low-priority', true)
  const {
    close: closeCreateTask,
    isOpen: isOpenCreateTask,
    open: openCreateTask,
  } = useModal()
  const {
    close: closeSettingsList,
    isOpen: isOpenSettingsList,
    open: openSettingsList,
  } = useModal()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(e.target.value)
  }

  const filteredTasks = tasks.filter((task) => {
    if (!viewCompletes && task.done) {
      return false
    }

    if (task.priority === 'high' && !viewHighPriority) {
      return false
    }

    if (task.priority === 'medium' && !viewMediumPriority) {
      return false
    }

    if (task.priority === 'low' && !viewLowPriority) {
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

  useEffect(() => {
    // press Ctrl + n or Cmd + n to open the modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey || e.metaKey) && e.key === 'n') {
        e.preventDefault()
        open()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [openCreateTask])

  return (
    <div className="text-white w-1/3 flex flex-col gap-1 overflow-hidden pt-2">
      <Modal isOpen={isOpenCreateTask} onClose={closeCreateTask}>
        <CreateNewTaskForm onClose={closeCreateTask} />
      </Modal>
      <Modal isOpen={isOpenSettingsList} onClose={closeSettingsList}>
        <ListSettingsForm
          onClose={closeSettingsList}
          setViewCompletes={setViewCompletes}
          viewCompletes={viewCompletes}
          setViewHighPriority={setViewHighPriority}
          viewHighPriority={viewHighPriority}
          setViewMediumPriority={setViewMediumPriority}
          viewMediumPriority={viewMediumPriority}
          setViewLowPriority={setViewLowPriority}
          viewLowPriority={viewLowPriority}
        />
      </Modal>
      <div className="flex flex-row gap-4 items-center w-full justify-between mb-2">
        <h2 className="text-2xl pl-3 font-geist font-bold">You Tasks</h2>
        {/* <div className="flex flex-row items-center gap-2 w-full">
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
        </div> */}
        <div className="flex flex-row items-center">
          <button
            className="hover:bg-gray-900 text-white rounded-md p-2 self-end text-lg mr-1"
            onClick={(e) => {
              e.preventDefault()
              openSettingsList()
            }}
          >
            <TbSettingsFilled />
          </button>
          <button
            className="hover:bg-gray-900 text-white rounded-md p-2 self-end text-lg mr-1"
            onClick={(e) => {
              e.preventDefault()
              openCreateTask()
            }}
          >
            <HiFolderAdd />
          </button>
        </div>
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
              <HiFolderAdd />
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
