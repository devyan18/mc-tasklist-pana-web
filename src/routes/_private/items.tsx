import { createFileRoute } from '@tanstack/react-router'
import { Item, ItemService } from '../../services/item.service'
import { ItemList } from '../../components/ItemList'
import { useCallback, useEffect, useState } from 'react'
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io'

export const Route = createFileRoute('/_private/items')({
  loader: async () => {
    return await ItemService.getItems({
      page: 1,
      limit: 1179,
    })
  },
  component: () => <ItemPage />,
})

function ItemPage() {
  const data = Route.useLoaderData()
  const [page, setPage] = useState(0)
  const [items, setItems] = useState<Item[]>([])

  const itemsWithLimit = useCallback(
    (page: number) => {
      const filterItems = []

      const max = 10 * (page + 1) > 1179 ? 1179 : 10 * (page + 1)

      for (let i = page * 10; i < max; i++) {
        filterItems.push(data[i])
      }

      return filterItems
    },
    [data],
  )

  useEffect(() => {
    setItems(itemsWithLimit(page))
  }, [page, data, itemsWithLimit])

  return (
    <div className="flex flex-col items-start w-full max-h-full overflow-auto scrollbar-track-gray-950 scrollbar-thumb-gray-900 scrollbar-thin">
      <div className="mb-4 flex flex-row gap-2">
        <button
          className="bg-gray-900 text-white px-2 rounded hover:bg-gray-950 transition-colors flex flex-row items-center"
          onClick={() => {
            if (page > 0) {
              setPage(page - 1)
            }
          }}
        >
          <IoMdArrowDropleft className="text-xl" />
          <span>Previous</span>
        </button>
        <button
          className="bg-gray-900 text-white px-2 rounded hover:bg-gray-950 transition-colors flex flex-row items-center"
          onClick={() => {
            if (page < Math.ceil(1179 / 10) - 1) {
              setPage(page + 1)
            }
          }}
        >
          <span>Next</span>
          <IoMdArrowDropright className="text-xl" />
        </button>
      </div>

      <span className="text-white mb-2 pl-2">
        Page {page + 1} of {Math.ceil(1179 / 10)}
      </span>
      <ItemList items={items} />
    </div>
  )
}
