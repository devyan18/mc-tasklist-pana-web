// src/components/TagInput.tsx
import { useSelectedTask } from '../context/SelectedTaskProvider'

// Definición de los colores disponibles
export const colors: string[] = [
  'bg-red-800',
  'bg-yellow-800',
  'bg-green-800',
  'bg-blue-800',
  'bg-indigo-800',
  'bg-purple-800',
  'bg-pink-800',
  'bg-teal-800',
  'bg-orange-800',
  'bg-cyan-800',
  'bg-lime-800',
  'bg-emerald-800',
]

// Función para obtener el color basado en la primera letra de la etiqueta
export const getColorByFirstLetter = (tag: string): string => {
  if (!tag || tag.length === 0) return colors[0] // Color por defecto si la etiqueta está vacía

  const firstChar = tag[0].toLowerCase()
  const charCode = firstChar.charCodeAt(0)

  // Verificar si el primer carácter es una letra (a-z)
  if (charCode < 97 || charCode > 122) {
    return colors[0] // Color por defecto si no es una letra
  }

  // Calcular el índice basado en la posición de la letra en el alfabeto
  const index = (charCode - 97) % colors.length
  return colors[index]
}

export const TagInput = ({ editable }: { editable: boolean }) => {
  const { tags, setTags } = useSelectedTask()

  const handleAddTag = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const input = form.elements.namedItem('tag') as HTMLInputElement

    if (input.value.trim().length > 0) {
      setTags([...tags, input.value.trim()])
      input.value = ''
    }
  }

  return (
    <div className="flex flex-col items-start w-full">
      {editable && (
        <form onSubmit={handleAddTag}>
          <input
            type="text"
            name="tag"
            placeholder="Tag"
            className="bg-gray-950 text-white outline-none px-2 py-1 rounded-md border-2 border-gray-900 mb-2 text-xs"
          />
        </form>
      )}
      <div className="flex gap-2 flex-wrap">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={`text-white px-3 rounded-xl ${getColorByFirstLetter(tag)} text-sm`}
          >
            {tag}

            {editable && (
              <button
                className="ml-2"
                onClick={() => {
                  setTags(tags.filter((t) => t !== tag))
                }}
              >
                x
              </button>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}
