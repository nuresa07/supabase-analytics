import { PostsState } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/blog/list`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
})

export const fetchPostBySlug = createAsyncThunk(
  "posts/fetchPostBySlug",
  async (slug: string) => {
    const rest = await fetch(`${import.meta.env.VITE_BACKEND_URL}/blog/${slug}`, {
      credentials: "include",
    })
    if (!rest.ok) throw new Error("Failed to fetch post detail");
    return rest.json();
  }
)

const initialState: PostsState = {
  posts: [],
  postDetail: null,
  loading: false,
  error: null,
}

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error fetching posts";
      })

      .addCase(fetchPostBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.postDetail = null;
      })
      .addCase(fetchPostBySlug.fulfilled, (state, action) => {
        state.loading = false
        state.postDetail = action.payload
      })
      .addCase(fetchPostBySlug.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch post"
      })
  }
})

export const selectPosts = (state: RootState) => state.posts.posts
export const selectPostsLoading = (state: RootState) => state.posts.loading
export default postsSlice.reducer;