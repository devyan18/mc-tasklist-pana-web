import { MdCheck } from 'react-icons/md'
import { toCapitalize } from '../utils/texts'
import { useTasks } from '../context/TaskProvider'
import { TaskService } from '../services/tasks.service'

export const TagColorItem = ({
  text,
  bg,
  selected,
  tagId,
}: {
  tagId: string
  bg: string
  text: string
  selected: string
}) => {
  const { sincronize } = useTasks()

  const handleClick = async () => {
    TaskService.changeTagColor(tagId, text)
      .then((e) => {
        if (!e) throw new Error('Failed to update tag color')

        sincronize()
      })
      .catch((e) => {
        console.error(e)
      })
  }

  return (
    <div
      className="flex flex-row items-center gap-2 mx-2 px-2 py-1 hover:bg-gray-800 cursor-pointer rounded-md"
      onClick={(e) => {
        e.preventDefault()
        handleClick()
      }}
    >
      <div className={`w-[18px] h-[18px] rounded-md ${bg}`}></div>
      <span className="text-gray-200 text-xs">{toCapitalize(text)}</span>
      <div className="ml-auto">
        {selected === text && <MdCheck className="text-green-500" />}
      </div>
    </div>
  )
}
