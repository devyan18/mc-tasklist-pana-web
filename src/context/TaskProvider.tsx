import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Task, TaskService } from '../services/tasks.service'

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

  const sincronizeTasks = async () => {
    const data = await TaskService.getTasks()
    setTasks(data)
  }

  useEffect(() => {
    TaskService.getTasks().then((e) => {
      setTasks(e)
    })
  }, [])

  return (
    <TasksContext.Provider
      value={{ tasks, setTasks, sincronize: sincronizeTasks }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export const useTasks = () => useContext(TasksContext)
