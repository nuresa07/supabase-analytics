export const blogListQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    "author": author->name,
    publishedAt,
    excerpt,
    "coverImage": coverImage.asset->url,
    tags
  }
`;

export const GET_ALL_POSTS = `
*[_type == "post"]{
  title,
  "slug": slug.current,
  "author": author->name,
  publishedAt,
  excerpt,
  "coverImage": coverImage.asset->url ,
  tags
} | order(publishedAt desc)
`;

export const blogDetailQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    "author": author->{
      name,
      "image": image.asset->url,
      bio 
    },
    publishedAt,
    excerpt,
    content[]{
      ...,
      _type == "image" => {
        "url": asset->url
      }
    },
    "coverImage": coverImage.asset->url,
    tags
  }
`;