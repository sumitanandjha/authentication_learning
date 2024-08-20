"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const  router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [disable, setDisable] = useState(true);

  const submitHandler = async () => {
    try {
      const res = await axios.post("/api/users/login", user);
      console.log(res);
      router.push("/");
      toast.success(res.data.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [user]);

  return (
    <div className="flex bg-[#669bbc] min-h-screen justify-center items-center">
      <div className="bg-white p-10 rounded-lg shadow-lg">
        <h1 className="font-bold">LOGIN</h1>

        <div className="flex flex-col my-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) =>
              setUser({
                ...user,
                email: e.target.value,
              })
            }
            className="border-2 outline-none border-zinc-600 rounded-md px-2 py-1"
          />
        </div>
        <div className="flex flex-col my-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={user.password}
            onChange={(e) =>
              setUser({
                ...user,
                password: e.target.value,
              })
            }
            className="border-2 outline-none border-zinc-600 rounded-md px-2 py-1"
          />
        </div>
        <button
          onClick={submitHandler}
          className={`${
            disable ? "bg-[#e3e3e3] cursor-not-allowed" : "bg-[#ff698f]"
          } w-full py-1 my-2 rounded-md text-white`}
          disabled={disable}
        >
          Login
        </button>
        <p className="mt-4">
          Do not have an account?{" "}
          <Link href="/signup" className="font-bold">
            SIGNUP
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
