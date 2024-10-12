import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Task, TaskService } from '../services/tasks.service'
import { useSession } from './SessionProvider'

type TasksContextType = {
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  sincronize: () => void
}

const TasksContext = createContext<TasksContextType>({
  tasks: [],
  setTasks: (tasks: Task[]) => {
    return tasks
  },
  sincronize: () => {},
})

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const { user } = useSession()

  const sincronizeTasks = async () => {
    const data = await TaskService.getTasks()
    setTasks(data)
  }

  useEffect(() => {
    if (!user) return

    TaskService.getTasks()
      .then((e) => {
        setTasks(e)
      })
      .catch((e) => {
        console.error(e)
      })
  }, [user])

  return (
    <TasksContext.Provider
      value={{ tasks, setTasks, sincronize: sincronizeTasks }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export const useTasks = () => useContext(TasksContext)
