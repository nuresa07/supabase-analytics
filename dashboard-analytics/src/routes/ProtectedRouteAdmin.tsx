import { RootState } from "@/redux/store";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

const ProtectedRouteAdmin = ({ children }: Props) => {
  const role = useSelector((state: RootState) => state.auth.role);
  const isRoleLoaded = useSelector((state: RootState) => state.auth.isRoleLoaded);

  if (!isRoleLoaded) {
    return <div className="p-4 text-gray-600">Loading...</div>;
    // return (
    //   <div className="flex items-center justify-center min-h-screen">
    //     <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500" />
    //   </div>
    // )
  }

  if (role !== 'admin') {
    return <Navigate to='/dashboard' replace />
  }

  return <>{children}</>
}

export default ProtectedRouteAdmin