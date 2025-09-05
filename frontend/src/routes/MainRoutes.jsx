import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserSignup from "../pages/UserSignup";
import UserLogin from "../pages/UserLogin";
import FoodPartnerSignup from "../pages/FoodPartnerSignup";
import FoodPartnerLogin from "../pages/FoodPartnerLogin";
import Home from "../pages/Home";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element = {<Home/>}/>
      <Route path="/user/signup" element={<UserSignup />} />
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/partner/signup" element={<FoodPartnerSignup />} />
      <Route path="/partner/login" element={<FoodPartnerLogin />} />
    </Routes>
  );
};

export default MainRoutes;
