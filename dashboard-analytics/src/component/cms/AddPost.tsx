import { useAddPostMutation } from "@/redux/api/blogApi"
import { useState } from "react"

const AddPost = () => {

  const [addPost] = useAddPostMutation()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addPost({ title, content })
    setTitle("");
    setContent("");
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 flex flex-col`}>
      <input className="border p-2 "
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea className="border p-2"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-blue-600">
        Add Post
      </button>
    </form>
  )
}

export default AddPost
