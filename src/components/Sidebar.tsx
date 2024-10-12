import { Link, useNavigate } from '@tanstack/react-router'
import { useSession } from '../context/SessionProvider'
import { toCapitalize } from '../utils/texts'
import { FaSitemap } from 'react-icons/fa6'
import { FaTasks } from 'react-icons/fa'
import { IoFlash } from 'react-icons/io5'
import { FaSignOutAlt } from 'react-icons/fa'
import { Modal } from './Modal'
import { useModal } from '../hooks/useModal'
import { MdCancel } from 'react-icons/md'
import { SessionService } from '../services/session.service'

export const Sidebar = () => {
  const { user, setUser } = useSession()
  const { isOpen, close, open } = useModal()
  const navigate = useNavigate()

  return (
    <div className="text-white w-[320px] pt-2 px-4 flex flex-col min-h-full">
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
      <div className="flex-1 flex flex-col justify-end">
        <div className="h-10">
          <Modal isOpen={isOpen} onClose={close}>
            <div>
              <h2>
                <span>Are you sure you want to </span>
                <span className="text-red-500">Sign Out</span>
                <span> ?</span>
              </h2>

              <div className="flex flex-row gap-4 items-center justify-center mt-10">
                <button
                  className="hover:bg-gray-950 font-geist bg-red-900/50 text-white py-1 px-4 rounded-xl flex flex-row items-center gap-2 self-start text-sm"
                  onClick={() => {
                    SessionService.signOut()
                      .then((e) => {
                        if (!e) return
                        setUser(null)
                        navigate({
                          to: '/login',
                        })
                      })
                      .catch((e) => {
                        console.log(e)
                      })
                  }}
                >
                  <span className="font-geist font-medium">Logout</span>
                  <FaSignOutAlt />
                </button>
                <button
                  className="hover:bg-gray-950 bg-gray-900 text-white py-1 px-4 rounded-xl flex flex-row items-center gap-2 self-start text-sm"
                  onClick={() => {
                    close()
                  }}
                >
                  <span className="font-geist font-medium">Cancel</span>
                  <MdCancel />
                </button>
              </div>
            </div>
          </Modal>
          <button
            className="flex flex-row items-center gap-2 text-white/70 hover:underline hover:text-white"
            onClick={open}
          >
            <span>Logout</span>
            <FaSignOutAlt />
          </button>
        </div>
      </div>
    </div>
  )
}
