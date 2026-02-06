import { AdminState, updateUserRoleProps } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const getAllUsers = createAsyncThunk(
  "admin/getAllUsers",
  async (token: string, thunkAPI) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })

    if (!res.ok) throw new Error("Failed to fetch users");
    const users = await res.json();
    return users;
  }
)

export const updateUserRole = createAsyncThunk(
  'admin/updateUserRole',
  async ({ id, role, token }: updateUserRoleProps, thunkAPI) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role })
    })

    if (!res.ok) throw new Error("Failed to update user role");

    // Optional: ambil user yang baru atau langsung re-fetch semua
    thunkAPI.dispatch(getAllUsers(token)); // refetch data
    const dataUpdated = await res.json();
    return dataUpdated;
  }
)

const initialState: AdminState = {
  users: [],
  loading: false,
  error: null,
  updating: false
}

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updating = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
        state.updating = false;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.error = action.error.message || 'terjadi kesalahan';
        state.loading = false;
        state.updating = false;
      })
  },
})

export default adminSlice.reducer