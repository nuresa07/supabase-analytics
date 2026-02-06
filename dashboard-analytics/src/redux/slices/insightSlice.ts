// import { supabase } from "@/lib/supabase";
import { supabase } from "@/lib/supabase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface InsightState {
  loading: boolean;
  error: string | null;
  data: {
    totalRevenue: number;
    totalUsers: number;
    revenueGrowth: number;
    userGrowth: number;
    summaryText: string;
  } | null;
}

const initialState: InsightState = {
  loading: false,
  error: null,
  data: null,
};

// Thunk: fetch insight dari backend
export const getInsightData = createAsyncThunk(
  "insight/fetch",
  async (
    { from, to }: { from: string; to: string },
    { rejectWithValue }
  ) => {
    try {

      const { data: insight } = await supabase.auth.getSession();
      const token = insight.session?.access_token

      if (!token) {
        console.warn("Token tidak ditemukan, tidak fetch analytics.");
        return;
      }

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/analytics/insight?from=${from}&to=${to}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error("Failed to fetch insight data");
      }

      const data = await res.json()
      return data;

    } catch (error: any) {
      return rejectWithValue(error.message || "Unknown error");
    }
  }
);

const insightSlice = createSlice({
  name: "insight",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInsightData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInsightData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getInsightData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  }
})


export default insightSlice.reducer;