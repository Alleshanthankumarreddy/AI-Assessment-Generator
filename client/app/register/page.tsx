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
const [loading, setLoading] = useState(false);
const [errors, setErrors] = useState({
  name: "",
  email: "",
  password: "",
  subject: "",
  institution: "",
  city: "",
  state: "",
  country: "",
});
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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

  };


  const handleLocationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const { name, value } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      institutionLocation: {
        ...prev.institutionLocation,
        [name]: value,
      },
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

  };

  const validate = () => {

  const newErrors = {
    name: "",
    email: "",
    password: "",
    subject: "",
    institution: "",
    city: "",
    state: "",
    country: "",
  };

  let isValid = true;

  if (!formData.name.trim()) {
    newErrors.name = "Name is required";
    isValid = false;
  } else if (formData.name.trim().length < 3) {
    newErrors.name = "Name must contain at least 3 characters";
    isValid = false;
  }

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

  if (!formData.subject.trim()) {
    newErrors.subject = "Subject is required";
    isValid = false;
  }

  if (!formData.institution.trim()) {
    newErrors.institution = "Institution is required";
    isValid = false;
  }

  if (!formData.institutionLocation.city.trim()) {
    newErrors.city = "City is required";
    isValid = false;
  }

  if (!formData.institutionLocation.state.trim()) {
    newErrors.state = "State is required";
    isValid = false;
  }

  if (!formData.institutionLocation.country.trim()) {
    newErrors.country = "Country is required";
    isValid = false;
  }

  setErrors(newErrors);

  return isValid;
};

  const handleSubmit = async (
  e: React.FormEvent
) => {

  e.preventDefault();

  if (!validate()) return;

  setLoading(true);

  try {

    const response = await api.post(
      "/auth/register",
      {
        ...formData,
        email: formData.email.trim(),
      },
      {
        withCredentials: true,
      }
    );

    if (response.data.success) {

      login(response.data.teacher);

      alert("Registration Successful");

      router.push("/");

    }

  } catch (error: any) {

    alert(
      error.response?.data?.message ||
      "Registration Failed"
    );

  } finally {

    setLoading(false);

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
                className="bg-transparent outline-none ml-3 w-full text-black placeholder:text-gray-500"
              />

            </div>

          </div>

          {errors.name && (
            <p className="text-red-500 text-sm mt-2">
              {errors.name}
            </p>
          )}

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
                className="bg-transparent outline-none ml-3 w-full text-black placeholder:text-gray-500"
              />

            </div>

          </div>
          {errors.subject && (
            <p className="text-red-500 text-sm mt-2">
              {errors.subject}
            </p>
          )}


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
                className="bg-transparent outline-none ml-3 w-full text-black placeholder:text-gray-500"
              />

            </div>

          </div>
          {errors.institution && (
            <p className="text-red-500 text-sm mt-2">
              {errors.institution}
            </p>
          )}


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
              className="bg-[#f7f7f7] rounded-2xl px-4 py-4 border border-black/5 outline-none text-black placeholder:text-gray-500"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">
                {errors.city}
              </p>
            )}

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
              className="bg-[#f7f7f7] rounded-2xl px-4 py-4 border border-black/5 outline-none text-black placeholder:text-gray-500"
            />
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">
                {errors.state}
              </p>
            )}
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
              className="bg-[#f7f7f7] rounded-2xl px-4 py-4 border border-black/5 outline-none text-black placeholder:text-gray-500"
            />
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">
                {errors.country}
              </p>
            )}
          </div>


          {/* BUTTON */}
          <button disabled={loading} className="w-full bg-black text-white py-4 rounded-2xl font-semibold hover:scale-[1.02] transition-all duration-300 shadow-xl">

            {loading ? "Registering..." : "Register"}

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