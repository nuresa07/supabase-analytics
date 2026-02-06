import { fetchPostBySlug } from "@/redux/slices/postsSlice"
import { AppDispatch, RootState } from "@/redux/store"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const BlogDetailPage = () => {

  const { slug } = useParams<{ slug: string }>()
  const dispatch = useDispatch<AppDispatch>()
  const { postDetail, loading, error } = useSelector((state: RootState) => state.posts)

  console.log(postDetail);


  useEffect(() => {
    if (slug) dispatch(fetchPostBySlug(slug))
  }, [slug, dispatch])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!postDetail) return <div>Post tidak ditemukan</div>


  return (
    <article className="max-w-3xl mx-auto p-6">
      {/* Judul */}
      <h1 className="text-4xl font-bold mb-4">{postDetail.title}</h1>

      {/* Info Author & Tanggal */}
      <div className="flex items-center gap-3 text-sm text-gray-600 mb-6">
        {postDetail.author?.image && (
          <img
            src={postDetail.author.image}
            alt={postDetail.author.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        )}
        <div>
          <p className="font-medium">{postDetail.author?.name}</p>
          <p>{new Date(postDetail.publishedAt).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Cover Image */}
      {postDetail.coverImage && (
        <img
          src={postDetail.coverImage}
          alt={postDetail.title}
          className="w-full h-auto rounded-lg mb-6"
        />
      )}

      {/* Konten */}
      <div className="prose max-w-none">
        {postDetail.content?.map((block: any) => {
          if (block._type === "block") {
            return (
              <p key={block._key}>
                {block.children?.map((child: any) => child.text).join("")}
              </p>
            )
          }
          return null
        })}
      </div>

      {/* Excerpt (opsional) */}
      {postDetail.excerpt && (
        <blockquote className="mt-6 italic text-gray-500">
          {postDetail.excerpt}
        </blockquote>
      )}
    </article>
  )
}

export default BlogDetailPage