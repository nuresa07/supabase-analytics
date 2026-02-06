import { ReactNode } from "react";

export interface ThemeState {
  darkMode: boolean;
  toggleDarkMode: () => void
}

export type HeadingProps = {
  title: string
}

interface CardProps {
  title: string;
  children: ReactNode;
  darkMode: boolean;
}

export interface DatePickerProps {
  value: { from: Date | null, to: Date | null };
  onChange: (value: { from: Date | null; to: Date | null }) => void;
  label?: string;
}

export interface SelectProps {
  options: { label: string, value: string }[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
}


export type Message = {
  role: "user" | "assistant";
  text: string;
}

export interface AnalyticsData {
  date: Date;
  users: number;
  revenue: number;
  session_duration: number;
  conversion_rate: number;
}

// Redux
export interface AnalyticsState {
  data: any[];
  loading: boolean;
  error: string | null;
}

export interface updateUserRoleProps {
  id: string;
  role: string;
  token: string;
}

export interface AdminState {
  users: any[];
  loading: boolean;
  error: string | null;
  updating: boolean;
}

export type Preset = "Last 7 Days" | "Last 30 Days" | "This Month" | "This Year";

export interface ChartParams {
  from: string;
  to: string;
  metric: string;
}

export interface ChartState {
  [metric: string]: {
    data: { date: string; value: number }[];
    loading: boolean;
    error: string | null;
    from?: string;
    to?: string;
  }
}

// landing page
export type FAQ = {
  _id: string;
  question: string;
  answer: string;
}

export interface PostsState {
  posts: any[];
  postDetail: Post | null
  loading: boolean;
  error: string | null;
}

// types/post.ts
export interface Author {
  name: string
  bio?: string
  image?: string | null
}

export interface BlockChild {
  _key: string
  _type: string
  text: string
}

export interface Block {
  _key: string
  _type: string
  style?: string
  children: BlockChild[]
  markDefs?: any[]
}

export interface Post {
  title: string
  slug: string
  excerpt?: string
  coverImage?: string
  publishedAt: string
  author: Author
  content: Block[]
  tags?: string[] | null
}

