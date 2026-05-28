"use client";

import Link from "next/link";
import {useRouter} from "next/navigation";
import api from "../../lib/axios";
import { useState } from "react";
import useAuthStore from "../../store/authStore";

import {
  Mail,
  Lock,
  User,
  School,
  BookOpen,
} from "lucide-react";

export default function RegisterPage() {
const router = useRouter();
const { login } =
  useAuthStore();
  const [formData, setFormData] =
    useState({

      name: "",
      email: "",
      password: "",
      subject: "",
      institution: "",

      institutionLocation: {
        city: "",
        state: "",
        country: "",
      },

    });


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const { name, value } =
      e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

  };


  const handleLocationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const { name, value } =
      e.target;

    setFormData({
      ...formData,

      institutionLocation: {
        ...formData.institutionLocation,
        [name]: value,
      },
    });

  };


  const handleSubmit = async (
  e: React.FormEvent
) => {

  e.preventDefault();

  try {

    const response =
      await api.post(
        "/auth/register",
        formData,
        {
          withCredentials: true,
        }
      );

    if (response.data.success) {

      // SAVE USER
      login(
        response.data.teacher
      );

      alert(
        "Registration Successful"
      );

      router.push("/");

    }

  } catch (error: any) {

    alert(
      error.response?.data?.message ||
      "Registration Failed"
    );

  }

};

  return (

    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center p-6">

      <div className="w-full max-w-2xl bg-white rounded-[32px] shadow-2xl border border-black/5 p-10">

        {/* TITLE */}
        <div className="text-center mb-10">

          <h1 className="text-4xl font-bold text-gray-900">
            Create Account
          </h1>

          <p className="text-gray-500 mt-3">
            Register as a teacher on VedaAI
          </p>

        </div>


        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* NAME */}
          <div>

            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Full Name
            </label>

            <div className="flex items-center bg-[#f7f7f7] rounded-2xl px-4 py-4 border border-black/5">

              <User
                size={18}
                className="text-gray-400"
              />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className="bg-transparent outline-none ml-3 w-full"
              />

            </div>

          </div>


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
                className="bg-transparent outline-none ml-3 w-full"
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
                className="bg-transparent outline-none ml-3 w-full"
              />

            </div>

          </div>


          {/* SUBJECT */}
          <div>

            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Subject
            </label>

            <div className="flex items-center bg-[#f7f7f7] rounded-2xl px-4 py-4 border border-black/5">

              <BookOpen
                size={18}
                className="text-gray-400"
              />

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter subject"
                className="bg-transparent outline-none ml-3 w-full"
              />

            </div>

          </div>


          {/* INSTITUTION */}
          <div>

            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Institution
            </label>

            <div className="flex items-center bg-[#f7f7f7] rounded-2xl px-4 py-4 border border-black/5">

              <School
                size={18}
                className="text-gray-400"
              />

              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                placeholder="Enter institution"
                className="bg-transparent outline-none ml-3 w-full"
              />

            </div>

          </div>


          {/* LOCATION */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <input
              type="text"
              name="city"
              placeholder="City"
              value={
                formData
                .institutionLocation.city
              }
              onChange={
                handleLocationChange
              }
              className="bg-[#f7f7f7] rounded-2xl px-4 py-4 border border-black/5 outline-none"
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              value={
                formData
                .institutionLocation.state
              }
              onChange={
                handleLocationChange
              }
              className="bg-[#f7f7f7] rounded-2xl px-4 py-4 border border-black/5 outline-none"
            />

            <input
              type="text"
              name="country"
              placeholder="Country"
              value={
                formData
                .institutionLocation.country
              }
              onChange={
                handleLocationChange
              }
              className="bg-[#f7f7f7] rounded-2xl px-4 py-4 border border-black/5 outline-none"
            />

          </div>


          {/* BUTTON */}
          <button className="w-full bg-black text-white py-4 rounded-2xl font-semibold hover:scale-[1.02] transition-all duration-300 shadow-xl">

            Create Account

          </button>

        </form>


        {/* FOOTER */}
        <p className="text-center text-gray-500 mt-8">

          Already have an account?{" "}

          <Link
            href="/login"
            className="text-black font-semibold"
          >
            Login
          </Link>

        </p>

      </div>

    </div>

  );
}