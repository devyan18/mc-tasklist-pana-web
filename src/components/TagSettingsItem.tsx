import { MdDelete, MdDragIndicator, MdExpandMore } from 'react-icons/md'
import { TagColorItem } from './TagColorItem'
import { Tag } from '../types/tag.entity'
import { useEffect, useRef, useState } from 'react'
import { getTagBackgroundColor } from './TagInput'
import { TaskService } from '../services/tasks.service'
import { useDebouncedChange } from '../hooks/useDebouncedChange'
import { useTasks } from '../context/TaskProvider'

export function TagSettingsItem({
  tag,
  open,
  colors,
  index,
}: {
  tag: Tag
  open?: boolean
  index: number
  colors: {
    text: string
    bg: string
  }[]
}) {
  const [isOpen, setOpen] = useState(open)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [tagName, setTagName] = useState(tag.name)
  const { sincronize } = useTasks()
  const panelRef = useRef<HTMLDivElement | null>(null)
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
      setOpen(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal()
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      dialogRef.current?.close()
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setPosition({
      x: rect.left,
      y: rect.bottom,
    })
    setOpen(!isOpen)
  }

  const debouncedChangeTagName = useDebouncedChange((newTagName: string) => {
    TaskService.changeTagName(tag._id!, newTagName)
      .then((tag) => {
        console.log(tag)
      })
      .then(() => {
        sincronize()
      })
  }, 500) // Delay de 300ms

  const handleChangeTagName = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setTagName(e.target.value)

    // Llamamos al método con debounce
    debouncedChangeTagName(e.target.value)
  }

  return (
    <>
      <div
        className="flex rounded-md flex-row gap-2 items-center justify-start w-full pr-2 pl-3 py-1 hover:bg-gray-900 cursor-pointer"
        onClick={handleClick}
      >
        <div>
          <MdDragIndicator className="text-gray-400 cursor-grab" />
        </div>
        <label
          htmlFor={`tag-${tag._id}`}
          className={`text-gray-200 select-none text-sm line-clamp-1 max-w-[200px] rounded-md px-2 ${getTagBackgroundColor(
            tag,
          )}`}
        >
          {tag.name}
        </label>
        <div className="flex flex-row gap-1 ml-auto">
          <MdExpandMore
            className={`cursor-pointer text-gray-400 transition-all ${!isOpen ? 'transform -rotate-90' : ''}`}
          />
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="fixed bg-transparent backdrop-filter-none backdrop-blur-none"
        style={{
          backgroundColor: 'transparent',
        }}
        onClick={() => setOpen(false)}
      >
        {isOpen && (
          <div
            ref={panelRef}
            className="fixed bg-gray-900 py-3 rounded-md shadow-lg w-[280px] flex flex-col gap-3"
            style={{
              [index > 3 ? 'bottom' : 'top']: `${index > 3 ? 0 : position.y}px`,
              right: `${position.x}px`,
              zIndex: 100,
            }}
            onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer clic dentro del panel
          >
            {/* // ! Input del nombre de la tag */}
            <input
              type="text"
              name="tag"
              value={tagName}
              className="bg-gray-950 text-gray-300 px-2 rounded-md outline-slate-800 mx-3 text-sm py-1"
              spellCheck={false}
              onChange={handleChangeTagName}
            />
            <button
              className="text-gray-300 flex flex-row gap-1 items-center text-sm hover:bg-gray-800 pr-2 pl-3 mx-1 py-1 rounded-md"
              onClick={(e) => {
                e.preventDefault()
                // setOpen(false)
              }}
            >
              <MdDelete className="mb-[2px]" />
              <span>Delete</span>
            </button>
            <hr />
            <p className="text-gray-400 text-sm pl-4">Colors</p>

            <div className="flex flex-col">
              {colors.map((color) => (
                <TagColorItem
                  tagId={tag._id!}
                  key={color.text}
                  text={color.text}
                  bg={color.bg}
                  selected={tag.color}
                />
              ))}
            </div>
          </div>
        )}
      </dialog>
    </>
  )
}
