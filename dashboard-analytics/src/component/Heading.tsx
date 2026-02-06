import { HeadingProps } from "@/types"

const Heading = ({ title }: HeadingProps) => {
  return (
    <h2 className="text-3xl font-bold mb-4">{title}</h2>
  )
}

export default Heading