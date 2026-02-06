import { supabase } from "@/lib/supabase";
import { AnalyticsState } from "@/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState: AnalyticsState = {
  data: [],
  loading: false,
  error: null
}

// Async Thunk untuk fetch data dari backend 
export const fetchAnalytics = createAsyncThunk(
  "analytics/fetchAnalytics",
  async (_, thunkAPI) => {
    const { data: sessionData } = await supabase.auth.getSession()

    const userId = sessionData.session?.user.id;

    const { data, error } = await supabase.rpc('formatted_analytics', {
      user_id: userId
    })

    if (error) throw error;

    return data;
  }
)

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
})

export default analyticsSlice.reducer;


// export const fetchAnalytics = createAsyncThunk(
//   "analytics/fetchAnalytics",
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await supabase.auth.getSession()

//       //  = data.session?.user?.id

//       const token = data.session?.access_token;
//       if (!token) {
//         console.warn("Token tidak ditemukan, tidak fetch analytics.");
//         return;
//       }
//       console.log("cek token", token);


//       const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/analytics`, {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         }
//       })
//       if (!response.ok) throw new Error("Failed to fetch analytics data")

//       return await response.json()
//     } catch (error: any) {
//       return rejectWithValue(error.message)
//     }
//   }
// )