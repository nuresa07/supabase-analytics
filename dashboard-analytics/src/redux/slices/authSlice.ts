import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  role: string | null;
  isRoleLoaded: boolean;
}

const initialState: AuthState = {
  role: null,
  isRoleLoaded: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
      state.isRoleLoaded = true;
    },
    clearRole: (state) => {
      state.role = null;
      state.isRoleLoaded = false;
    },
    markRoleLoaded: (state) => {
      state.isRoleLoaded = true;
    }
  }
})


export const { setRole, clearRole, markRoleLoaded } = authSlice.actions;
export default authSlice.reducer;