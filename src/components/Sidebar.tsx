import { Link } from '@tanstack/react-router'
import { useSession } from '../context/SessionProvider'
import { toCapitalize } from '../utils/texts'
import { FaSitemap } from 'react-icons/fa6'
import { FaTasks } from 'react-icons/fa'
import { IoFlash } from 'react-icons/io5'

export const Sidebar = () => {
  const { user } = useSession()

  return (
    <div className="text-white w-[320px] pt-2 px-4">
      <div className="flex flex-row gap-4 items-center pb-5">
        <img
          decoding="async"
          src={user?.avatar}
          alt="User avatar"
          className="w-[42px] h-[42px] rounded-lg object-cover"
        />
        <div className="flex flex-col">
          <span className="text-white font-medium text-lg">
            @{toCapitalize(user!.username)}
          </span>
          <span className="text-white/70">{user!.email}</span>
        </div>
      </div>
      <div className="h-[2px] w-full bg-slate-900" />
      <ul className="mt-2 flex flex-col gap-2">
        <li>
          <Link to="/tasks">
            {({ isActive }) => {
              return (
                <span
                  className={`flex flex-row items-center gap-2 hover:underline ${isActive ? 'text-purple-500 font-medium ' : 'text-white/70'}`}
                >
                  <FaTasks />
                  <span>Tasks</span>
                </span>
              )
            }}
          </Link>
        </li>
        <li>
          <Link to="/quick">
            {({ isActive }) => {
              return (
                <span
                  className={`flex flex-row items-center gap-2 hover:underline ${isActive ? 'text-purple-500 font-medium ' : 'text-white/70'}`}
                >
                  <IoFlash />
                  <span>Quick</span>
                </span>
              )
            }}
          </Link>
        </li>
        <li>
          <Link to="/items">
            {({ isActive }) => {
              return (
                <span
                  className={`flex flex-row items-center gap-2 hover:underline ${isActive ? 'text-purple-500 font-medium ' : 'text-white/70'}`}
                >
                  <FaSitemap />
                  <span>Items</span>
                </span>
              )
            }}
          </Link>
        </li>
      </ul>
    </div>
  )
}
