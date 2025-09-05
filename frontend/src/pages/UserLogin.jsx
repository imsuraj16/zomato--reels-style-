import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/actions/userActions";

const UserLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.user);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginHandler = async (data) => {
    const result = await dispatch(loginUser(data));
    if (result.user) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-black/40 backdrop-blur-xl p-8 rounded-2xl shadow-lg w-full max-w-md border border-white/10">
        {/* Title */}
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(loginHandler)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-black/30 text-white border border-white/10 focus:ring-2 focus:ring-purple-500 outline-none backdrop-blur-sm"
              {...register("email", { required: "Email is required" })}
            />
          </div>
          <p>
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </p>

          {/* Password */}
          <div>
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg bg-black/30 text-white border border-white/10 focus:ring-2 focus:ring-purple-500 outline-none backdrop-blur-sm"
              {...register("password", { required: "Password is required" })}
            />
          </div>
          <p>
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </p>

           {error && (
            <p className="text-red-500 text-sm">
              {error.msg}
            </p>
          )} 

          {/* Forgot Password */}
          <div className="flex justify-end">
            <a href="#" className="text-sm text-purple-400 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-purple-600/90 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-purple-500/50 transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link to="/user/signup" className="text-purple-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
