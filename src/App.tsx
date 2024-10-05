import { Descriptor } from './components/Descriptor'
import { TaskList } from './components/TaskList'
import { useSession } from './context/SessionProvider'
import { SignIn } from './components/SignIn'
import { Toaster } from 'react-hot-toast'

const Divider = () => {
  return <div className="w-[1px] bg-gray-800 h-full" />
}

function App() {
  const { user } = useSession()

  if (user === undefined) {
    return <div>Loading...</div>
  }

  if (user == null) {
    return <SignIn />
  }

  return (
    <>
      <div className="flex min-w-full h-screen">
        <div className="w-full bg-gray-950 flex flex-row  p-6 rounded-3xl shadow-sm shadow-gray-900">
          <TaskList />
          <Divider />
          <Descriptor />
        </div>
      </div>
      <Toaster
        position="bottom-right"
        gutter={8}
        containerStyle={{}}
        containerClassName=""
        toastOptions={{
          duration: 5000,
          style: {
            background: '#020617',
            color: '#fff',
            borderRadius: '8px',
            borderWidth: '2px',
            borderColor: '#111827',
          },
        }}
      />
    </>
  )
}

export default App
