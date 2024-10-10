import { useEffect, type ReactNode } from 'react'
import { IoMdClose } from 'react-icons/io'

interface ModalProps {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
}

export const Modal = ({ onClose, isOpen, children }: ModalProps) => {
  useEffect(() => {
    // if press ESC close modal

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, isOpen])

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`z-50 fixed inset-0 flex justify-center items-center transition-colors ${isOpen ? 'visible bg-black/50 backdrop-blur-md' : 'invisible'} `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-gray-950 p-6 rounded-lg shadow transition-all ${isOpen ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 rounded-lg text-gray-700 hover:text-gray-500 cursor-pointer"
        >
          <IoMdClose />
        </button>
        {children}
      </div>
    </div>
  )
}
