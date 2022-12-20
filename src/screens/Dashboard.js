import React from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "../components/CommonButton";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="text-white">
      User Dashboard
      <CommonButton
        onClick={() => navigate("/profile")}
        text="View Profile"
        extraClass="mb-10"
      />
    </div>
  );
};

export default Dashboard;
