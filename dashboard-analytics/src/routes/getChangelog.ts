import { sanity } from "../lib/sanity.cli";

export async function getChangelog() {
  return await sanity.fetch(`
    *[_type == "changelog"] | order(date desc) {
      _id,title,slug,date,body
    }
  `)
}