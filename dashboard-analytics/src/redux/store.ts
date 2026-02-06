import { configureStore } from "@reduxjs/toolkit";
import analyticsReducer from "@/redux/slices/analyticsSlice"
import authReducer from "@/redux/slices/authSlice"
import adminReducer from "@/redux/slices/adminSlice"
import insightReducer from "@/redux/slices/insightSlice"
import chartReducer from '@/redux/slices/chartSlice';
import postsReducer from '@/redux/slices/postsSlice';
import { blogApi } from "./api/blogApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    analytics: analyticsReducer,
    auth: authReducer, // = {data: [],loading: false,error: null}
    admin: adminReducer,
    insight: insightReducer,
    chart: chartReducer,
    posts: postsReducer,

    [blogApi.reducerPath]: blogApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;