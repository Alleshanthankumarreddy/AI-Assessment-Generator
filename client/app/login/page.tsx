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
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });
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

  const { name, value } = e.target;

  setFormData({
    ...formData,
    [name]: value,
  });

  setErrors({
    ...errors,
    [name]: "",
  });

};


const handleSubmit = async (
  e: React.FormEvent
) => {
  e.preventDefault();
  if (!validate()) return;
  setLoading(true);

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
const validate = () => {
  const newErrors = {
    email: "",
    password: "",
  };

  let isValid = true;

  if (!formData.email.trim()) {
    newErrors.email = "Email is required";
    isValid = false;
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
  ) {
    newErrors.email = "Please enter a valid email";
    isValid = false;
  }

  if (!formData.password.trim()) {
    newErrors.password = "Password is required";
    isValid = false;
  } else if (formData.password.length < 8) {
    newErrors.password =
      "Password must be at least 8 characters";
    isValid = false;
  }

  setErrors(newErrors);

  return isValid;
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
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">
              {errors.email}
            </p>
          )}


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
          {errors.password && (
            <p className="text-red-500 text-sm mt-2">
              {errors.password}
            </p>
          )}

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