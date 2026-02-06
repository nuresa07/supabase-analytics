import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
  tagTypes: ["Blog"],
  endpoints: (builder) => ({
    getPosts: builder.query<any[], void>({
      query: () => "/blog/list",
      providesTags: ["Blog"],
    }),
    addPost: builder.mutation<any, { title: string, content: string }>({
      query: (newPost) => ({
        url: "/blog/create",
        method: "POST",
        body: newPost
      }),
      invalidatesTags: ["Blog"],
    })
  })
})

export const { useGetPostsQuery, useAddPostMutation } = blogApi;