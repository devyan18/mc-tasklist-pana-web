import { createContext, useContext, useEffect, useState } from 'react'
import { Task, TaskService } from '../services/tasks.service'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Tag } from '../types/tag.entity'

type SelectedTaskContextType = {
  selectedTask: Task | null
  setSelectedTask: (task: Task | null) => void
  tags: Tag[]
  setTags: (tags: Tag[]) => void
  priority: 'low' | 'medium' | 'high'
  setPriority: (priority: 'low' | 'medium' | 'high') => void
}

const SelectedTaskContext = createContext<SelectedTaskContextType>({
  selectedTask: null,
  setSelectedTask: (task: Task | null) => {
    return task
  },
  tags: [],
  setTags: (tags: Tag[]) => {
    return tags
  },
  priority: 'low',
  setPriority: (priority: 'low' | 'medium' | 'high') => {
    return priority
  },
})

export function SelectedTaskProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [value, setValue] = useState<Task | null>(null)
  const { value: idTask, setValue: setIdTask } = useLocalStorage<string | null>(
    'selected-task',
    null,
  )

  const changePriority = (priority: 'low' | 'medium' | 'high') => {
    if (value) {
      setValue({ ...value, priority })
    }
  }

  const handleChangeTags = (tags: Tag[]) => {
    if (value) {
      setValue({ ...value, tags })
    }
  }

  const handleChangeValue = (task: Task | null) => {
    setValue(task)
    setIdTask(task?._id || null)
  }

  useEffect(() => {
    if (idTask && !value) {
      TaskService.getById(idTask).then((e) => {
        setValue(e)
      })
    }
  }, [idTask, value])

  return (
    <SelectedTaskContext.Provider
      value={{
        selectedTask: value,
        setSelectedTask: handleChangeValue,
        tags: value?.tags || [],
        setTags: handleChangeTags,
        priority: value?.priority || 'low',
        setPriority: changePriority,
      }}
    >
      {children}
    </SelectedTaskContext.Provider>
  )
}

export const useSelectedTask = () => useContext(SelectedTaskContext)
