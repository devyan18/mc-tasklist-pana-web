type ToggleProps = {
  isOn: boolean
  handleToggle: () => void
}

export const Toggle = (props: ToggleProps) => {
  return (
    <div
      className={`w-10 h-6 flex items-center  rounded-full p-1 cursor-pointer transition-colors duration-300 ${
        props.isOn ? 'bg-gray-900' : 'bg-gray-900'
      }`}
      onClick={props.handleToggle}
    >
      <div
        className={`w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
          props.isOn
            ? 'translate-x-4 bg-purple-500'
            : 'translate-x-0 bg-gray-500'
        }`}
      ></div>
    </div>
  )
}
