// import { Descriptor } from './components/Descriptor'
// import { TaskList } from './components/TaskList'
// import { useSession } from './context/SessionProvider'
// import { SignIn } from './components/SignIn'
// import { Toaster } from 'react-hot-toast'
// import { Sidebar } from './components/Sidebar'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { useSession } from './context/SessionProvider'

const router = createRouter({
  routeTree,
  context: {
    authentication: undefined!,
  },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function App() {
  const authentication = useSession()
  return <RouterProvider router={router} context={{ authentication }} />
}

// function App() {
//   const { user } = useSession()

//   if (user === undefined) {
//     return <div>Loading...</div>
//   }

//   if (user == null) {
//     return <SignIn />
//   }

//   return (
//     <>
//       <div className="flex min-w-full h-screen font-geist">
//         <div className="w-full bg-gray-950 flex flex-row  p-6 rounded-3xl shadow-sm shadow-gray-900">
//           <Sidebar />
//           <TaskList />
//           <Divider />
//           <Descriptor />
//         </div>
//       </div>
//       <Toaster
//         position="bottom-right"
//         gutter={8}
//         containerStyle={{}}
//         containerClassName=""
//         toastOptions={{
//           duration: 5000,
//           style: {
//             background: '#020617',
//             color: '#fff',
//             borderRadius: '8px',
//             borderWidth: '2px',
//             borderColor: '#111827',
//           },
//         }}
//       />
//     </>
//   )
// }

// export default App
