import { useEffect, useState, lazy, Suspense, useCallback } from 'react'
import { useSelectedTask } from '../context/SelectedTaskProvider'
import { FaRegSave } from 'react-icons/fa'
import { TaskService } from '../services/tasks.service'
import { toast } from 'react-hot-toast'
import { TagInput } from './TagInput'
import { useTasks } from '../context/TaskProvider'
import { Toggle } from './Toggle'
import { MdCancel, MdDelete } from 'react-icons/md'
import { Modal } from './Modal'
import { useModal } from '../hooks/useModal'
import { toCapitalizeFirst } from '../utils/texts'
import { convert } from 'html-to-text'
import { useSession } from '../context/SessionProvider'

const ShowTask = lazy(() => import('./ShowTask'))
const CustomEditor = lazy(() => import('./Editor'))

export const Descriptor = () => {
  const [idSelectedTask, setIdSelectedTask] = useState<string | null>(null)
  const { sincronize } = useTasks()
  const { selectedTask, priority, setPriority, setSelectedTask } =
    useSelectedTask()
  const { tasks } = useTasks()
  const [editable, setEditable] = useState<boolean>(false)

  const { user } = useSession()

  const [done, setDone] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')
  const { close, isOpen, open } = useModal()

  const handleSave = useCallback(async () => {
    const title = value.match(/<h2.*?>(.*?)<\/h2>/)?.[1] || ''
    const description = value.replace(/<h2.*?>(.*?)<\/h2>/, '')
    toast
      .promise(
        TaskService.updateTask(selectedTask!._id, {
          ...selectedTask,
          tags: selectedTask!.tags,
          title,
          description,
          done,
        }),
        {
          loading: 'Updating task...',
          success: 'Task updated',
          error: 'Failed to update task',
        },
        {
          style: {
            minWidth: '250px',
          },
        },
      )
      .then(() => {
        sincronize()
      })
  }, [selectedTask, value, done, sincronize])

  const handlePriority = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value as 'low' | 'medium' | 'high')
  }

  const toggleEditable = async () => {
    setEditable(!editable)
    if (editable) {
      await handleSave()
    }
  }

  useEffect(() => {
    if (!value) {
      console.log('value is empty')
    }
  }, [value, editable])

  useEffect(() => {
    if (selectedTask) {
      setValue(
        `<h2 style="text-align:center;">${selectedTask.title}</h2>` +
          selectedTask.description,
      )

      setDone(selectedTask.done)
    }
  }, [selectedTask, setPriority])

  useEffect(() => {
    if (!selectedTask) {
      return
    }
    if (idSelectedTask !== selectedTask?._id) {
      setIdSelectedTask(selectedTask?._id)
    }
  }, [selectedTask, idSelectedTask])

  useEffect(() => {
    setEditable(false)
  }, [idSelectedTask])

  useEffect(() => {
    // add event listener to save task when user press Ctrl + S or Cmd + S

    const handleSaveTask = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        handleSave()
      }
    }

    if (editable) {
      document.addEventListener('keydown', handleSaveTask)
    }

    return () => {
      document.removeEventListener('keydown', handleSaveTask)
    }
  }, [handleSave, editable])

  console.log({ selectedTask })
  console.log({ user })

  return (
    <div className="text-white w-2/3 pl-4 flex flex-col overflow-hidden justify-start gap-2 max-h-screen pt-2">
      {selectedTask ? (
        <>
          <Modal isOpen={isOpen} onClose={close}>
            <div>
              <h2>
                <span>Are you sure you want to delete the task </span>
                <span className="text-red-500">
                  {toCapitalizeFirst(convert(selectedTask.title, {}))}
                </span>
                <span> ?</span>
              </h2>

              <div className="flex flex-row gap-4 items-center justify-center mt-10">
                <button
                  className="hover:bg-gray-950 font-geist bg-red-900/50 text-white py-1 px-4 rounded-xl flex flex-row items-center gap-2 self-start text-sm"
                  onClick={() => {
                    toast
                      .promise(
                        TaskService.deleteTask(selectedTask!._id),
                        {
                          loading: 'Deleting task...',
                          success: 'Task deleted',
                          error: 'Failed to delete task',
                        },
                        {
                          style: {
                            minWidth: '250px',
                          },
                        },
                      )
                      .then(() => {
                        sincronize()
                        setSelectedTask(null)
                        close()
                      })
                  }}
                >
                  <MdDelete className="mb-[2px]" />
                  <span className="font-geist font-bold">Delete</span>
                </button>
                <button
                  className="hover:bg-gray-950 bg-gray-900 text-white py-1 px-4 rounded-xl flex flex-row items-center gap-2 self-start text-sm"
                  onClick={() => {
                    close()
                  }}
                >
                  <MdCancel className="mb-[2px]" />
                  <span>Close</span>
                </button>
              </div>
            </div>
          </Modal>
          <div className="z-10 flex flex-col gap-4 items-center justify-start">
            <div className="flex flex-row justify-start w-full gap-4 items-center">
              {editable && (
                <button
                  className="hover:bg-gray-950  bg-gray-900 text-white py-1 px-4 rounded-xl flex flex-row items-center gap-2 self-start text-sm"
                  onClick={() => {
                    setEditable(false)
                    setSelectedTask(
                      tasks.find((task) => task._id === selectedTask!._id)!,
                    )
                  }}
                >
                  <MdCancel className="mb-[2px]" />
                  <span>Cancel</span>
                </button>
              )}
              <button
                className={`hover:bg-gray-950 ${
                  editable ? 'bg-purple-800' : 'bg-gray-900'
                } text-white py-1 px-4 rounded-xl flex flex-row items-center gap-2 self-start text-sm`}
                onClick={() => {
                  toggleEditable()
                }}
              >
                <FaRegSave className="mb-[2px]" />
                <span>{editable ? 'Save' : 'Edit'}</span>
              </button>

              {editable && (
                <div className="flex flex-row items-center gap-2">
                  <span>Task is done</span>
                  <Toggle isOn={done} handleToggle={() => setDone(!done)} />
                </div>
              )}
              {editable && (
                <div className="flex flex-row gap-2 items-center">
                  <span>Priority</span>
                  <select
                    defaultValue={priority}
                    onChange={handlePriority}
                    value={priority}
                    className="outline-none bg-gray-900 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2 py-1 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              )}
              {editable && selectedTask.creator?._id === user?._id && (
                <button
                  className="hover:bg-gray-950  bg-red-900/50 text-white py-1 px-4 rounded-xl flex flex-row items-center gap-2 self-start text-sm"
                  onClick={() => {
                    open()
                  }}
                >
                  <MdDelete className="mb-[2px]" />
                  <span>Delete</span>
                </button>
              )}
            </div>
            <TagInput editable={editable} />
          </div>
          <div className="scrollbar-track-gray-950 scrollbar-thumb-gray-900 scrollbar-thin overflow-y-auto overflow-x-hidden min-h-full">
            {editable ? (
              <Suspense fallback={<h1>Loading...</h1>}>
                <CustomEditor value={value} setValue={setValue} />
              </Suspense>
            ) : (
              <Suspense fallback={<h1>Loading...</h1>}>
                <ShowTask value={value} />
              </Suspense>
            )}
          </div>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <h1>No task selected</h1>
        </div>
      )}
    </div>
  )
}
