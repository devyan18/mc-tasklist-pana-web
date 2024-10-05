import { useState } from 'react'
import { useSession } from '../context/SessionProvider'
import { SessionService } from '../services/session.service'

export function SignIn() {
  const [haveAccount, setHaveAccount] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const { setUser } = useSession()

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const data = Object.fromEntries(formData.entries())

    await SessionService.signIn({
      email: data.email as string,
      password: data.password as string,
    })
      .then(({ user }) => {
        console.log(user)
        setUser(user)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const handleSubmitSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const data = Object.fromEntries(formData.entries())

    const user = {
      username: data.username as string,
      email: data.email as string,
      password: data.password as string,
      avatar: selectedFile,
    }

    await SessionService.signUp(user)
      .then(({ user }) => {
        console.log(user)
        setUser(user)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
    }
  }

  if (!haveAccount) {
    return (
      <div className="flex min-w-full h-screen items-center justify-center bg-black">
        <form
          className="flex flex-col gap-2 bg-gray-900 rounded-xl px-4 pt-6 pb-3 w-1/5"
          onSubmit={handleSubmitSignUp}
        >
          <h2 className="text-white font-bold">Sign Up</h2>
          <input
            className="bg-gray-950 outline-none rounded-md text-white px-2 py-1 text-sm"
            type="text"
            placeholder="username"
            name="username"
          />
          <input
            className="bg-gray-950 outline-none rounded-md text-white px-2 py-1 text-sm"
            type="email"
            placeholder="example@ex.com"
            name="email"
          />
          <div className="flex items-center">
            <label
              htmlFor="avatar"
              className="bg-gray-950 text-white text-sm px-4 py-1 rounded-md cursor-pointer hover:bg-slate-800 transition-colors"
            >
              {selectedFile ? 'Cambiar' : 'Seleccionar'}
            </label>
            <span className="ml-4 text-white text-sm">
              {selectedFile ? selectedFile.name : 'No hay avatar seleccionado'}
            </span>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          <input
            className="bg-gray-950 outline-none rounded-md text-white px-2 py-1 text-sm"
            type="password"
            name="password"
            placeholder="*********"
            id=""
          />
          <button
            type="submit"
            className="bg-gray-950 text-white hover:bg-slate-800 text-sm px-4 py-1 rounded-xl"
          >
            Sign Up
          </button>
          <button
            onClick={() => setHaveAccount(true)}
            className="text-white hover:text-gray-400 text-sm px-4 py-1 rounded-xl"
          >
            I have an account
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="flex min-w-full h-screen items-center justify-center bg-black">
      <form
        className="flex flex-col gap-2 bg-gray-900 rounded-xl px-4 pt-6 pb-3 w-1/6"
        onSubmit={handleSubmitLogin}
      >
        <h2 className="text-white font-bold">Sign In</h2>
        <input
          className="bg-gray-950 outline-none rounded-md text-white px-2 py-1 text-sm"
          type="email"
          placeholder="example@ex.com"
          name="email"
        />
        <input
          className="bg-gray-950 outline-none rounded-md text-white px-2 py-1 text-sm"
          type="password"
          name="password"
          placeholder="*********"
          id=""
        />
        <button
          type="submit"
          className="bg-gray-950 text-white hover:bg-slate-800 text-sm px-4 py-1 rounded-xl"
        >
          Sign In
        </button>
        <button
          onClick={() => setHaveAccount(false)}
          className="text-white hover:text-gray-400 text-sm px-4 py-1 rounded-xl"
        >
          I don't have an account
        </button>
      </form>
    </div>
  )
}
