import { supabase } from "@/lib/supabase"
import { markRoleLoaded, setRole } from "@/redux/slices/authSlice"
import { AppDispatch, RootState } from "@/redux/store"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const useInitializeAuth = () => {
  const dispacth = useDispatch<AppDispatch>()
  const isRoleLoaded = useSelector((state: RootState) => state.auth.isRoleLoaded)

  useEffect(() => {
    // hanya jalankan jika role belum dimuat
    if (isRoleLoaded) return;

    const getRole = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        console.error("Error fetching session:", error)
        return;
      }

      const role = data?.session?.user?.user_metadata?.role;
      if (role) {
        dispacth(setRole(role))
      } else {
        dispacth(markRoleLoaded())
      }
    }

    getRole()

  }, [dispacth, isRoleLoaded])
}

export default useInitializeAuth;