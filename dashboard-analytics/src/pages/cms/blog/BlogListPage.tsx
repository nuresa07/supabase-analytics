import { useGetPostsQuery } from "@/redux/api/blogApi"
import { useThemeStore } from "@/stores/ThemeStore"
import { useState } from "react"
import { Link } from "react-router-dom"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AddPost } from "@/component/cms"

const BlogListPage = () => {

  const { data: posts, error, isLoading } = useGetPostsQuery()
  const { darkMode } = useThemeStore()
  const [open, setOpen] = useState(false)

  if (isLoading) return <div>Loading...</div>
  if (error) return <p>Error fetching posts</p>;
  if (!posts?.length) return <div>Tidak ada postingan.</div>
  console.log(posts);


  return (
    <div className="p-4">
      <div className="flex justify-between border items-center mb-6">
        <h2 className="text-xl font-bold">Blog List</h2>

        {/* Button + Modal */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button onClick={() => setOpen(true)}>+ Add Post</button>
          </DialogTrigger>
          <DialogContent className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
            }`}>
            <DialogHeader>
              <DialogTitle>Add New Post</DialogTitle>
            </DialogHeader>
            <AddPost />
          </DialogContent>
        </Dialog>
      </div>

      {posts.map(({ author, coverImage, excerpt, publishedAt, slug, tags, title }, idx) => {
        const date = new Date(publishedAt).toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })

        const safeTags = Array.isArray(tags) ? tags : []

        return (
          <article
            key={slug || idx}
            className={`border max-w-sm rounded-lg ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"
              } overflow-hidden shadow mb-6`}
          >
            <div
              className={`w-full h-48 overflow-hidden flex items-center justify-center ${darkMode ? "bg-gray-900" : "bg-gray-100"
                }`}
            >
              <img src={coverImage || "https://picsum.photos/seed/picsum/600/400"} alt={title} className="object-contain max-h-48" />
            </div>

            <div className="p-4">
              <h2
                className={`text-lg font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"
                  }`}
              >
                <Link to={`/admin/blog/${slug}`} className="hover:underline">
                  {title}
                </Link>
              </h2>

              <p className={`text-sm mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                <em>By {author}</em> • <time>{date}</time>
              </p>

              <p className={`text-sm mb-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                {excerpt}
              </p>

              {safeTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {safeTags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs px-2 py-1 rounded ${darkMode ? "bg-gray-700 text-gray-200" : "bg-gray-200 text-gray-800"
                        }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>
        )
      })}

    </div>
  )
}

export default BlogListPage
