"use client";
import { loginuser } from "@/actions/user.action";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const Page = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const [Showpassword, setShowpassword] = useState(false);

  console.log(Showpassword);

  const handleLogin = (data) => {
    dispatch(loginuser(data));
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <form
        className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
        onSubmit={handleSubmit(handleLogin)}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <div className="flex flex-col gap-2 mb-4">
          <label className="text-sm sm:text-base">Enter Email</label>
          <input
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="mail"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">Email is required</span>
          )}
        </div>

        <div className="relative flex flex-col gap-2 mb-4">
          <label className="text-sm sm:text-base">Enter Password</label>
          <div className="w-full relative">
            <input
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type={Showpassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", { required: true })}
            />
            <div
              onClick={() => setShowpassword((prev) => !prev)}
              className="absolute bottom-2 cursor-pointer right-4 text-blue-600">
              <FontAwesomeIcon icon={Showpassword ? faEye : faEyeSlash} />
            </div>
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm">Password is required</span>
          )}
        </div>
        
        <div className="text-xl">
          <p>Don't have an account please ...<Link className="text-blue-400" href={"https://ai-prompt-generator-rosy-five.vercel.app/user/register"}>Register</Link></p>
        </div>

        <div>
          <button
            type="submit"
            className="w-1/3 bg-blue-600 cursor-pointer mt-2 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;