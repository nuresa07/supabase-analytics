import { getChangelog } from "@/routes/getChangelog"
import { Link } from "react-router-dom"


const ChangelogPage = async () => {

  const data = await getChangelog()

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 border-white border-1">
      <h1 className="text-2xl font-bold mb-6">📢 Update Terbaru</h1>
      <ul className="space-y-6">
        {data.map((item: any) => (
          <li key={item._id}>
            <Link to={`/changelog/${item.slug.current}`}>
              <h2 className="text-lg font-semibold hover:text-blue-600">{item.title}</h2>
              <p className="text-sm text-gray-500">{new Date(item.date).toLocaleDateString("id-ID")}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ChangelogPage
