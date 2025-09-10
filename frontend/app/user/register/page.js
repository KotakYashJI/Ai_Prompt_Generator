"use client";
import { registeruser } from "@/actions/user.action";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const Page = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const password = watch("password");

  const handleregister = (data) => {
    dispatch(registeruser(data));
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <form
        className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
        onSubmit={handleSubmit(handleregister)}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Regiser</h2>
        <div className="flex flex-col gap-2 mb-4">
          <label className="text-sm sm:text-base">Enter Firstname</label>
          <input
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="first name"
            {...register("firstname", { required: true })}
          />
          {errors.firstname && (
            <span className="text-red-500 text-sm">Firstname is required</span>
          )}
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label className="text-sm sm:text-base">Enter Lastname</label>
          <input
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="last name"
            {...register("lastname", { required: true })}
          />
          {errors.lastname && (
            <span className="text-red-500 text-sm">Lastname is required</span>
          )}
        </div>
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
        <div className="flex flex-col gap-2 mb-4">
          <label className="text-sm sm:text-base">Enter Password</label>
          <input
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">Password is required</span>
          )}
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label className="text-sm sm:text-base">Enter Confirm Password</label>
          <input
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Confirm_Password"
            {...register("confirmpassword",
              {
                required: true,
                validate: ((pass) => pass === password && "Password does not match")
              }
            )}
          />
          {errors.confirmpassword && (
            <span className="text-red-500 text-sm">Password is required</span>
          )}
        </div>

        <div className="text-xl">
          <p>Aready have an account please ...<Link className="text-blue-400" href={"https://ai-prompt-generator-rosy-five.vercel.app/user/login"}>Login</Link></p>
        </div>

        <div>
          <button
            type="submit"
            className="w-1/3 bg-blue-600 cursor-pointer mt-2 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;