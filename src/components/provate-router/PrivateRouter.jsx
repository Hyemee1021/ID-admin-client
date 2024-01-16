import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRouter = ({ children }) => {
  const { admin } = useSelector((state) => state.adminInfo);
  const location = useLocation();

  return admin?.role === "admin" ? (
    children
  ) : (
    <Navigate
      to="/"
      state={{
        from: { location },
      }}
    />
  );
};
