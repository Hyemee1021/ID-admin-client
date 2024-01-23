import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SignUp from "./pages/sign-in-up/SignUp";
import SignIn from "./pages/sign-in-up/SignIn";
import VerifyEmail from "./pages/sign-in-up/VerifyEmail";
import Dashboard from "./pages/dashboard/Dashboard";
import Category from "./pages/category/Category";
import Product from "./pages/product/Product";
import PaymentOptions from "./pages/payment-option/PaymentOptions";
import Order from "./pages/order/Order";
import Customer from "./pages/customer/Customer";
import AdminUser from "./pages/admin-user/AdminUser";
import MyProfile from "./pages/profile/MyProfile";
import { PrivateRoute } from "./components/provate-route/PrivateRoute";
import ResetPassword from "./pages/sign-in-up/ResetPassword";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllCats } from "./pages/category/categoryAction";
import NewProduct from "./pages/product/NewProduct";
import EditProduct from "./pages/product/EditProduct";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCats());
  }, [dispatch]);
  return (
    <div>
      <Routes>
        {/* public route  */}
        <Route path="/" element={<SignIn />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* private route  */}
        <Route path="/admin-sign-up" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/category"
          element={
            <PrivateRoute>
              <Category />
            </PrivateRoute>
          }
        />
        <Route
          path="/product"
          element={
            <PrivateRoute>
              <Product />
            </PrivateRoute>
          }
        />
        <Route
          path="/payment-option"
          element={
            <PrivateRoute>
              <PaymentOptions />
            </PrivateRoute>
          }
        />
        <Route
          path="/order"
          element={
            <PrivateRoute>
              <Order />
            </PrivateRoute>
          }
        />
        <Route
          path="/customer"
          element={
            <PrivateRoute>
              <Customer />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-user"
          element={
            <PrivateRoute>
              <AdminUser />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <MyProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/product/new"
          element={
            <PrivateRoute>
              <NewProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/product/edit/:_id"
          element={
            <PrivateRoute>
              <EditProduct />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<h1>404 Page not found</h1>} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
