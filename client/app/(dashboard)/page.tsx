"use client";

import Link from "next/link";

import {
  Sparkles,
  FileText,
  Brain,
  Upload,
  Clock,
  Download,
  Eye,
  CheckCircle2,
  Layers3,
  BookOpen,
  ShieldCheck,
  Wand2,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {

  const features = [

    {
      title: "AI Question Paper Generation",
      description:
        "Generate complete question papers automatically using Gemini AI based on syllabus, notes, and custom instructions.",
      icon: Brain,
    },

    {
      title: "Multiple Question Types",
      description:
        "Create MCQs, descriptive, short answer, long answer, true/false, fill in the blanks, and more.",
      icon: Layers3,
    },

    {
      title: "File Upload Support",
      description:
        "Upload PDF and TXT study materials to generate questions directly from the provided content.",
      icon: Upload,
    },

    {
      title: "Real-time Generation",
      description:
        "Track assignment generation live using Socket.IO with instant status updates.",
      icon: Clock,
    },

    {
      title: "Question Paper Viewer",
      description:
        "View beautifully formatted question papers with sections, marks, and instructions.",
      icon: Eye,
    },

    {
      title: "Download as PDF",
      description:
        "Export generated question papers as professional PDF documents instantly.",
      icon: Download,
    },

  ];

  const workflow = [

    {
      step: "01",
      title: "Create Assignment",
      description:
        "Enter title, subject, due date, and assignment details.",
    },

    {
      step: "02",
      title: "Configure Questions",
      description:
        "Choose question types, difficulty levels, marks, and number of questions.",
    },

    {
      step: "03",
      title: "Upload Study Material",
      description:
        "Upload PDF/TXT syllabus or notes for AI-powered question generation.",
    },

    {
      step: "04",
      title: "AI Generates Paper",
      description:
        "Gemini AI generates a structured question paper automatically.",
    },

    {
      step: "05",
      title: "View & Download",
      description:
        "Preview the generated paper and download it as a PDF.",
    },

  ];

  return (

    <div className="space-y-8">

      {/* HERO SECTION */}
      <div className="bg-gradient-to-br from-black to-gray-800 rounded-[32px] p-6 lg:p-12 text-white overflow-hidden relative">

        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

          {/* LEFT */}
          <div className="max-w-3xl">

            <div className="flex items-center gap-3 mb-5">

              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">

                <Sparkles size={24} />

              </div>

              <p className="text-sm uppercase tracking-[4px] text-gray-300 font-medium">

                AI Powered Assessment Platform

              </p>

            </div>

            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">

              Welcome to
              <span className="block text-gray-300">
                VedaAI Assessment System
              </span>

            </h1>

            <p className="text-gray-300 mt-6 text-base lg:text-lg leading-relaxed max-w-2xl">

              An intelligent AI-powered platform for teachers to generate,
              manage, and download professional question papers instantly
              using study materials, syllabus, and custom instructions.

            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">

              <Link
                href="/generate-assignment"
                className="bg-white text-black px-7 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:scale-105 transition"
              >

                Generate Assignment

                <ArrowRight size={18} />

              </Link>

              <Link
                href="/assignments"
                className="border border-white/20 bg-white/5 backdrop-blur-sm px-7 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition"
              >

                View Assignments

              </Link>

            </div>

          </div>

          {/* RIGHT STATS */}
          <div className="grid grid-cols-2 gap-4 w-full lg:w-[360px]">

            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10">

              <Brain size={28} />

              <h3 className="text-3xl font-bold mt-5">

                AI

              </h3>

              <p className="text-sm text-gray-300 mt-2">

                Gemini AI powered question generation

              </p>

            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10">

              <FileText size={28} />

              <h3 className="text-3xl font-bold mt-5">

                PDF

              </h3>

              <p className="text-sm text-gray-300 mt-2">

                Download professional question papers

              </p>

            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10">

              <Clock size={28} />

              <h3 className="text-3xl font-bold mt-5">

                Live

              </h3>

              <p className="text-sm text-gray-300 mt-2">

                Real-time generation updates with sockets

              </p>

            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10">

              <ShieldCheck size={28} />

              <h3 className="text-3xl font-bold mt-5">

                Secure

              </h3>

              <p className="text-sm text-gray-300 mt-2">

                Teacher-specific assignment management

              </p>

            </div>

          </div>

        </div>

      </div>

      {/* FEATURES */}
      <div>

        <div className="mb-8">

          <h2 className="text-3xl font-bold text-gray-900">

            Features Implemented

          </h2>

          <p className="text-gray-500 mt-2">

            Everything currently available in the VedaAI Assessment System

          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {
            features.map(
              (feature, index) => {

                const Icon =
                  feature.icon;

                return (

                  <div
                    key={index}
                    className="bg-white rounded-[28px] p-7 shadow-sm border border-black/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >

                    <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center">

                      <Icon size={26} />

                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mt-6">

                      {feature.title}

                    </h3>

                    <p className="text-gray-600 mt-3 leading-relaxed">

                      {feature.description}

                    </p>

                  </div>

                );

              }
            )
          }

        </div>

      </div>

      {/* WORKFLOW */}
      <div className="bg-white rounded-[32px] p-6 lg:p-10 shadow-sm border border-black/5">

        <div className="mb-10">

          <h2 className="text-3xl font-bold text-gray-900">

            How the System Works

          </h2>

          <p className="text-gray-500 mt-2">

            End-to-end AI assignment generation workflow

          </p>

        </div>

        <div className="space-y-6">

          {
            workflow.map(
              (item, index) => (

                <div
                  key={index}
                  className="flex flex-col lg:flex-row lg:items-center gap-5 p-6 rounded-3xl bg-[#f8f8f8]"
                >

                  {/* STEP */}
                  <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center text-xl font-bold shrink-0">

                    {item.step}

                  </div>

                  {/* CONTENT */}
                  <div className="flex-1">

                    <h3 className="text-xl font-bold text-gray-900">

                      {item.title}

                    </h3>

                    <p className="text-gray-600 mt-2">

                      {item.description}

                    </p>

                  </div>

                  {/* ICON */}
                  <div className="hidden lg:flex w-14 h-14 rounded-2xl bg-white items-center justify-center">

                    <CheckCircle2
                      size={28}
                      className="text-green-500"
                    />

                  </div>

                </div>

              )
            )
          }

        </div>

      </div>

      {/* TECH STACK */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* FRONTEND */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-black/5">

          <div className="flex items-center gap-3">

            <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center">

              <Wand2 size={28} />

            </div>

            <div>

              <h3 className="text-2xl font-bold text-gray-900">

                Frontend

              </h3>

              <p className="text-gray-500">

                Modern responsive UI

              </p>

            </div>

          </div>

          <div className="mt-8 space-y-4">

            <div className="flex items-center justify-between bg-[#f8f8f8] rounded-2xl px-5 py-4">

              <span className="font-medium">
                Next.js 16
              </span>

              <span className="text-sm text-gray-500">
                App Router
              </span>

            </div>

            <div className="flex items-center justify-between bg-[#f8f8f8] rounded-2xl px-5 py-4">

              <span className="font-medium">
                Tailwind CSS
              </span>

              <span className="text-sm text-gray-500">
                Responsive UI
              </span>

            </div>

            <div className="flex items-center justify-between bg-[#f8f8f8] rounded-2xl px-5 py-4">

              <span className="font-medium">
                Zustand
              </span>

              <span className="text-sm text-gray-500">
                State Management
              </span>

            </div>

            <div className="flex items-center justify-between bg-[#f8f8f8] rounded-2xl px-5 py-4">

              <span className="font-medium">
                Socket.IO Client
              </span>

              <span className="text-sm text-gray-500">
                Real-time updates
              </span>

            </div>

          </div>

        </div>

        {/* BACKEND */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-black/5">

          <div className="flex items-center gap-3">

            <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center">

              <BookOpen size={28} />

            </div>

            <div>

              <h3 className="text-2xl font-bold text-gray-900">

                Backend

              </h3>

              <p className="text-gray-500">

                AI & queue processing

              </p>

            </div>

          </div>

          <div className="mt-8 space-y-4">

            <div className="flex items-center justify-between bg-[#f8f8f8] rounded-2xl px-5 py-4">

              <span className="font-medium">
                Node.js + Express
              </span>

              <span className="text-sm text-gray-500">
                REST APIs
              </span>

            </div>

            <div className="flex items-center justify-between bg-[#f8f8f8] rounded-2xl px-5 py-4">

              <span className="font-medium">
                MongoDB
              </span>

              <span className="text-sm text-gray-500">
                Database
              </span>

            </div>

            <div className="flex items-center justify-between bg-[#f8f8f8] rounded-2xl px-5 py-4">

              <span className="font-medium">
                BullMQ + Redis
              </span>

              <span className="text-sm text-gray-500">
                Background workers
              </span>

            </div>

            <div className="flex items-center justify-between bg-[#f8f8f8] rounded-2xl px-5 py-4">

              <span className="font-medium">
                Gemini AI
              </span>

              <span className="text-sm text-gray-500">
                Question generation
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}