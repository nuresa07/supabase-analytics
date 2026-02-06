import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "@/lib/supabase";
import { ChartParams, ChartState } from "@/types";
import { RootState } from "../store";

const initialState: ChartState = {}

export const getChartData = createAsyncThunk(
  'chart/getChartData',
  async ({ from, to, metric }: ChartParams, { getState, rejectWithValue }) => {

    const state = getState() as RootState;
    const existing = state.chart[metric];

    if (existing?.from === from && existing?.to === to) {
      console.log("🧠 Skip fetch: already cached");
      return rejectWithValue("Already cached");
    }

    try {
      const { data, error } = await supabase.from('analytics')
        .select(`date, ${metric}`)
        .gte('date', from)
        .lte('date', to)
        .order('date', { ascending: true });

      if (error) throw error;

      return {
        metric,
        data: data.map((item: any) => ({
          date: item.date,
          value: Number(item[metric] || 0)
        })),
        from,
        to
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
)

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getChartData.pending, (state, action) => {
      const metric = action.meta.arg.metric;
      state[metric] = {
        data: [],
        loading: true,
        error: null
      }
    })
    builder.addCase(getChartData.fulfilled, (state, action) => {
      const { metric, data, from, to } = action.payload
      state[metric] = {
        data,
        loading: false,
        error: null,
        from,
        to
      }
    })
    builder.addCase(getChartData.rejected, (state, action) => {
      const metric = action.meta.arg.metric;

      if ((action.payload as string) === "Already cached") {
        return;
      }

      state[metric] = {
        data: [],
        loading: false,
        error: action.payload as string
      }
    })
  }
})

export default chartSlice.reducer;