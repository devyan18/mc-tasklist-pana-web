import { SelectedTaskProvider } from './context/SelectedTaskProvider.tsx'
import { SessionProvider } from './context/SessionProvider.tsx'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TasksProvider } from './context/TaskProvider.tsx'

export const $root = document.getElementById('root')!

createRoot($root).render(
  <SessionProvider>
    <TasksProvider>
      <SelectedTaskProvider>
        <App />
      </SelectedTaskProvider>
    </TasksProvider>
  </SessionProvider>,
)
