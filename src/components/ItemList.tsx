import { Item } from '../services/item.service'

export const ItemList = ({ items }: { items: Item[] }) => {
  return (
    <div className="flex flex-row flex-wrap">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center flex-col justify-around w-[150px] h-[150px] p-2 border-2 border-gray-900 hover:bg-gray-900 transition-colors cursor-pointer"
        >
          <img loading="lazy" src={item.image} alt={item.name} />
          <h1 className="text-white/80 text-center">{item.name}</h1>
          <p className="text-white/60 text-xs">{item.mod}</p>
        </div>
      ))}
    </div>
  )
}
