import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import AddBanner from "../screens/AddBanner";
import AddCategory from "../screens/AddCategory";
import AllBanners from "../screens/AllBanners";
import AllQueries from "../screens/AllQueries";
import AllUsers from "../screens/AllUsers";
import EditBanner from "../screens/EditBanner";
import SubscriptionPrice from "../screens/SubscriptionPrice";

const AdminRoutes = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (
      !localStorage.getItem("token") ||
      localStorage.getItem("role") !== "admin"
    )
      navigate("/login");
  }, []);
  return (
    <div>
      <AdminNavbar />
      <div className="mt-4">
        <Routes>
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/add-banner" element={<AddBanner />} />
          <Route path="/edit/:id" element={<EditBanner />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/subscription-price" element={<SubscriptionPrice />} />
          <Route path="/all-queries" element={<AllQueries />} />
          <Route path="/all-banners" element={<AllBanners />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminRoutes;
