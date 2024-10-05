import { useSession } from '../context/SessionProvider'
import { toCapitalize } from '../utils/texts'

export const Sidebar = () => {
  const { user } = useSession()

  return (
    <div className="text-white w-[280px]">
      <div className="flex flex-row gap-4 items-center">
        <img
          decoding="async"
          src={user?.avatar}
          alt="User avatar"
          className="w-[42px] h-[42px] rounded-md object-cover"
        />
        <span className="text-white/80 font-bold text-lg">
          {toCapitalize(user!.username)}
        </span>
      </div>
    </div>
  )
}
