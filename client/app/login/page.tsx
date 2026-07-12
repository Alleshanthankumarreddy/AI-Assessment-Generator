"use client";
import {useRouter} from "next/navigation";
import api from "../../lib/axios";
import useAuthStore from "../../store/authStore";
import Link from "next/link";
import { useState } from "react";

import {
  Mail,
  Lock,
} from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
const { login } =
  useAuthStore();
  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };


const handleSubmit = async (
  e: React.FormEvent
) => {
  setLoading(true);
  e.preventDefault();

  try {

    const response =
      await api.post(
        "/auth/login",
        formData,
        {
          withCredentials: true,
        }
      );

    if (response.data.success) {

      // SAVE TEACHER
      login(
        response.data.teacher
      );

      alert(
        "Login Successful"
      );

      router.push("/");

    }

  } catch (error: any) {

    alert(
      error.response?.data?.message ||
      "Login Failed"
    );

  }

  setLoading(false);
};


  return (

    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-white rounded-[32px] shadow-2xl border border-black/5 p-10">

        {/* TITLE */}
        <div className="text-center mb-10">

          <h1 className="text-4xl font-bold text-gray-900">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-3">
            Login to continue using VedaAI
          </p>

        </div>


        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* EMAIL */}
          <div>

            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Email
            </label>

            <div className="flex items-center bg-[#f7f7f7] rounded-2xl px-4 py-4 border border-black/5">

              <Mail
                size={18}
                className="text-gray-400"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="bg-transparent outline-none ml-3 w-full text-black placeholder:text-gray-500"
              />

            </div>

          </div>


          {/* PASSWORD */}
          <div>

            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Password
            </label>

            <div className="flex items-center bg-[#f7f7f7] rounded-2xl px-4 py-4 border border-black/5">

              <Lock
                size={18}
                className="text-gray-400"
              />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="bg-transparent outline-none ml-3 w-full text-black placeholder:text-gray-500"
              />

            </div>

          </div>


          {/* BUTTON */}
          <button disabled={loading} className="w-full bg-black text-white py-4 rounded-2xl font-semibold hover:scale-[1.02] transition-all duration-300 shadow-xl">

            {loading ? "Logging in..." : "Login"}

          </button>

        </form>


        {/* FOOTER */}
        <p className="text-center text-gray-500 mt-8">

          Don&apos;t have an account?{" "}

          <Link
            href="/register"
            className="text-black font-semibold"
          >
            Register
          </Link>

        </p>

      </div>

    </div>

  );
}