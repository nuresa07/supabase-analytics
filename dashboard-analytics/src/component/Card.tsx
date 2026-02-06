import { CardProps } from "@/types"

const Card = ({ title, children, darkMode }: CardProps) => {
  return (
    <div className={`${darkMode ? "bg-gray-800 border-[#8884d8] border" : "bg-white"}  p-4 rounded-lg shadow-lg border`}>
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      {children}
    </div>
  )
}

export default Card