import { useState } from 'react'
import { useSession } from '../context/SessionProvider'
import { SessionService } from '../services/session.service'
import { useNavigate } from '@tanstack/react-router'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'

type ILoginSchema = {
  email: string
  password: string
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export function SignIn() {
  const [haveAccount, setHaveAccount] = useState(true)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginSchema>({
    resolver: zodResolver(loginSchema),
  })

  const navigate = useNavigate()

  const { setUser } = useSession()

  const onSubmitSignIn = async (data: ILoginSchema) => {
    await SessionService.signIn({
      email: data.email as string,
      password: data.password as string,
    })
      .then(({ user }) => {
        console.log(user)
        setUser(user)

        setTimeout(() => {
          console.log('am here')
          navigate({
            to: '/tasks',
          })
        }, 200)
      })
      .catch((error) => {
        console.log('llegué')
        toast.error('Failed to sign in with those credentials')
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
        reset()
        navigate({
          to: '/tasks',
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files?.length > 0) {
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
        onSubmit={handleSubmit(onSubmitSignIn)}
      >
        <h2 className="text-white font-bold">Sign In</h2>
        <div className="flex flex-col">
          <label className="text-white text-sm pl-1">Email</label>
          <input
            className="bg-gray-950 outline-none rounded-md text-white px-2 py-1 text-sm"
            type="email"
            placeholder="example@ex.com"
            {...register('email')}
          />

          {errors.email && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-white text-sm pl-1">Password</label>
          <input
            className="bg-gray-950 outline-none rounded-md text-white px-2 py-1 text-sm"
            type="password"
            placeholder="*********"
            {...register('password')}
          />

          {errors.password && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
        </div>
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
