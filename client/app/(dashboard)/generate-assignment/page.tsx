"use client";

import { useState, useEffect } from "react";

import api from "../../../lib/axios";
import { useRouter } from "next/navigation";
import socket from "../../../lib/socket";
import useAssignmentStore from "../../../store/assignmentStore";

import {
  CalendarDays,
  Minus,
  Plus,
  Upload,
  Mic,
  ArrowLeft,
  ArrowRight,
  X,
} from "lucide-react";

const GenerateAssignmentPage = () => {
  const router = useRouter();

  const {

  setGeneratedPaper,

  setSelectedAssignment,

} = useAssignmentStore();
  // ================= FORM STATES =================

  const [title, setTitle] =
    useState("");

  const [subject, setSubject] =
    useState("");

  const [dueDate, setDueDate] =
    useState("");

  const [instructions, setInstructions] =
    useState("");

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [errors, setErrors] = useState({
    title: "",
    subject: "",
    dueDate: "",
    file: "",
    questionTypes: "",
    instructions: "",
  });

  // ================= QUESTION TYPES =================

  const QUESTION_TYPE_OPTIONS = [
    "MCQ",
    "Descriptive",
    "True/False",
    "Fill in the Blanks",
    "Match the Following",
    "Short Answer",
    "Long Answer",
  ];


  const [questionTypes, setQuestionTypes] =
    useState([
      {
        type: "MCQ",
        questions: 5,
        marks: 1,
        difficulty: "easy",
      },
    ]);


  // ================= TOTALS =================

  const totalQuestions =
    questionTypes.reduce(
      (acc, item) =>
        acc + item.questions,
      0
    );

  const totalMarks =
    questionTypes.reduce(
      (acc, item) =>
        acc +
        item.questions * item.marks,
      0
    );


  // ================= UPDATE QUESTIONS =================

  const updateQuestions = (
    index: number,
    operation: "inc" | "dec"
  ) => {

    const updated =
      [...questionTypes];

    if (operation === "inc") {

      updated[index].questions += 1;

    } else if (
      updated[index].questions > 1
    ) {

      updated[index].questions -= 1;

    }

    setQuestionTypes(updated);

  };


  // ================= UPDATE MARKS =================

  const updateMarks = (
    index: number,
    operation: "inc" | "dec"
  ) => {

    const updated =
      [...questionTypes];

    if (operation === "inc") {

      updated[index].marks += 1;

    } else if (
      updated[index].marks > 1
    ) {

      updated[index].marks -= 1;

    }

    setQuestionTypes(updated);

  };


  // ================= REMOVE QUESTION =================

  const removeQuestionType = (
    index: number
  ) => {

    const updated =
      questionTypes.filter(
        (_, i) => i !== index
      );

    setQuestionTypes(updated);

  };


  // ================= ADD QUESTION TYPE =================

  const addQuestionType = () => {

    setQuestionTypes([
      ...questionTypes,
      {
        type: "MCQ",
        questions: 1,
        marks: 5,
        difficulty: "medium",
      },
    ]);

  };

  const validate = () => {

  const newErrors = {
    title: "",
    subject: "",
    dueDate: "",
    file: "",
    questionTypes: "",
    instructions: "",
  };

  let isValid = true;

  // Assignment Title
  if (!title.trim()) {
    newErrors.title = "Assignment title is required";
    isValid = false;
  } else if (title.trim().length < 3) {
    newErrors.title =
      "Title should contain at least 3 characters";
    isValid = false;
  }

  // Subject
  if (!subject.trim()) {
    newErrors.subject = "Subject is required";
    isValid = false;
  }

  // Due Date
  if (!dueDate) {
    newErrors.dueDate = "Please select a due date";
    isValid = false;
  } else {

    const today = new Date();
    today.setHours(0,0,0,0);

    const selected = new Date(dueDate);

    if (selected < today) {
      newErrors.dueDate =
        "Due date cannot be in the past";
      isValid = false;
    }

  }

  // File
  if (!selectedFile) {
    newErrors.file =
      "Please upload a PDF or TXT file";
    isValid = false;
  } else {

    const allowedTypes = [
      "application/pdf",
      "text/plain",
    ];

    if (
      !allowedTypes.includes(selectedFile.type)
    ) {

      newErrors.file =
        "Only PDF or TXT files are allowed";

      isValid = false;
    }

    if (
      selectedFile.size >
      10 * 1024 * 1024
    ) {

      newErrors.file =
        "Maximum file size is 10MB";

      isValid = false;
    }

  }

  // Question Types
  if (questionTypes.length === 0) {

    newErrors.questionTypes =
      "Add at least one question type";

    isValid = false;

  }

  // Instructions
  if (
    instructions.length > 1000
  ) {

    newErrors.instructions =
      "Instructions cannot exceed 1000 characters";

    isValid = false;

  }

  setErrors(newErrors);

  return isValid;

};

// ================= HANDLE SUBMIT =================

const handleSubmit = async () => {


  try {
    if (!validate()) return;
    setLoading(true);

    const formData =
      new FormData();


    // ================= BASIC FIELDS =================

    const teacher =
  JSON.parse(
    localStorage.getItem("teacher") || "{}"
  );

const TeacherId =
  teacher?._id;

console.log(
  "TeacherId:",
  TeacherId
);

// ================= APPEND TEACHER ID =================

formData.append(
  "TeacherId",
  TeacherId || ""
);

    formData.append(
      "title",
      title
    );

    formData.append(
      "subject",
      subject
    );

    formData.append(
      "dueDate",
      dueDate
    );

    formData.append(
      "instructions",
      instructions
    );


    // ================= QUESTION CONFIGURATIONS =================

    formData.append(

      "questionConfigurations",

      JSON.stringify(

        questionTypes.map(
          (item) => ({

            type:
              item.type,

            numberOfQuestions:
              item.questions,

            marksPerQuestion:
              item.marks,

            difficulty:
              item.difficulty,

          })
        )

      )

    );


    // ================= FILE =================

    if (selectedFile) {

      formData.append(
        "uploadedFile",
        selectedFile
      );

    }


    // ================= API CALL =================

    await api.post(

      "/assignment/create",

      formData,

      {

        headers: {

          "Content-Type":
            "multipart/form-data",

        },

      }

    );

    setTimeout(() => {
      setLoading(false);
      router.push("/assignments");
    }, 5000);

  } catch (error: any) {

    console.log(error);

    setLoading(false);

    alert(

      error.response?.data?.message ||

      "Something went wrong"

    );

  }

};



  // ================= PROGRESS =================

  const calculateProgress = () => {

    let progress = 0;


    if (title.trim()) {
      progress += 10;
    }

    if (subject.trim()) {
      progress += 10;
    }

    if (dueDate) {
      progress += 15;
    }

    if (
      questionTypes.length > 0
    ) {
      progress += 20;
    }

    if (selectedFile) {
      progress += 30;
    }

    return progress;

  };


  const progress =
    calculateProgress();


    useEffect(() => {

  const handleStatusUpdate =
    (data: any) => {

      console.log(
        "Socket Update:",
        data
      );

      // QUESTION PAPER READY
      if (
        data.status ===
          "completed" &&

        data.generatedPaper
      ) {

        // STORE PAPER
        setGeneratedPaper(
          data.generatedPaper
        );

        // OPTIONAL
        setSelectedAssignment({
          _id:
            data.assignmentId,

          title:
            title,

          subject:
            subject,

          dueDate:
            dueDate,

          status:
            "completed",

          createdAt:
            new Date().toISOString(),


          institution:
            data.institution || "VedaAI Assessment System",



        });

        // STOP LOADER
        setLoading(false);

        // NAVIGATE
        router.push(
          "/question-paper"
        );

      }


      // FAILED
      if (
        data.status ===
        "failed"
      ) {

        setLoading(false);

        alert(
          "Question paper generation failed"
        );

      }

    };


  socket.on(
    "assignment-status",
    handleStatusUpdate
  );


  return () => {

    socket.off(
      "assignment-status",
      handleStatusUpdate
    );

  };

}, [
  router,
  title,
  subject,
  dueDate,
]);

  return (
    

    <div className="max-w-5xl mx-auto">
      {
        loading && (

          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center">

            <div className="w-20 h-20 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>

            <p className="text-white text-xl font-semibold mt-8">

              Generating Question Paper...

            </p>

            <p className="text-gray-300 mt-2">

              AI is preparing your assignment

            </p>

          </div>

        )
      }
      {/* HEADER */}
      <div className="mb-8">

        <div className="flex items-center gap-3">

          <div className="w-3 h-3 rounded-full bg-green-500"></div>

          <h1 className="text-3xl font-bold text-gray-900">

            Create Assignment

          </h1>

        </div>

        <p className="text-gray-500 mt-2">

          Set up a new assignment for your students

        </p>

      </div>


      {/* PROGRESS BAR */}
      <div className="mb-10">

        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">

          <div
            style={{
              width: `${progress}%`,
            }}
            className="h-full bg-black rounded-full transition-all duration-500"
          ></div>

        </div>

      </div>


      {/* MAIN CARD */}
      <div className="bg-white rounded-[32px] p-10 shadow-sm border border-black/5">

        {/* TITLE */}
        <div className="mb-8">

          <h2 className="text-3xl font-bold text-gray-900">

            Assignment Details

          </h2>

          <p className="text-gray-500 mt-2">

            Basic information about your assignment

          </p>

        </div>


        {/* ASSIGNMENT TITLE */}
        <div className="mb-8">

          <label className="block mb-3 text-sm font-semibold text-gray-700">

            Assignment Title

          </label>

          <input
            type="text"
            value={title}
            onChange={(e)=>{

                setTitle(e.target.value);

                setErrors(prev=>({
                    ...prev,
                    title:"",
                }));

            }}
            placeholder="Enter assignment title"
            className="w-full bg-[#f7f7f7] rounded-2xl px-5 py-4 outline-none border border-black/5 text-black placeholder:text-gray-500"
          />

        </div>
        {errors.title && (
            <p className="text-red-500 text-sm mt-2">
                {errors.title}
            </p>
        )}


        {/* SUBJECT */}
        <div className="mb-8">

          <label className="block mb-3 text-sm font-semibold text-gray-700">

            Subject

          </label>

          <input
            type="text"
            value={subject}
            onChange={(e) =>
              {
              setSubject(
                e.target.value
              )
              setErrors(prev=>({
                ...prev,
                subject:"",
              }));
            }
            }
            placeholder="Enter subject"
            className="w-full bg-[#f7f7f7] rounded-2xl px-5 py-4 outline-none border border-black/5 text-black placeholder:text-gray-500"
          />

        </div>
        {errors.subject && (
            <p className="text-red-500 text-sm mt-2">
                {errors.subject}
            </p>
        )}


        {/* FILE UPLOAD */}
        <div className="border-2 border-dashed border-gray-300 rounded-[28px] p-12 flex flex-col items-center justify-center text-center mb-10">

          <Upload
            size={32}
            className="text-gray-500"
          />

          <h3 className="mt-5 text-lg font-medium text-gray-800">

            Choose a file or drag & drop it here

          </h3>

          <p className="text-gray-400 text-sm mt-2">

            PDF or TXT files upto 10MB

          </p>


          <label className="mt-6">

            <input
              type="file"
              hidden
              accept=".pdf,.txt"
              onChange={(e)=>{

                  if(e.target.files?.[0]){

                      setSelectedFile(e.target.files[0]);

                      setErrors(prev=>({
                          ...prev,
                          file:"",
                      }));

                  }

              }}
            />

            <div className="bg-gray-100 hover:bg-gray-200 transition px-6 py-3 rounded-xl text-sm font-medium cursor-pointer text-gray-700">

              Browse Files

            </div>

          </label>


          {selectedFile && (

            <p className="mt-4 text-green-600 text-sm font-medium">

              {selectedFile.name}

            </p>

          )}


          <p className="text-gray-400 text-sm mt-6">

            Upload syllabus, notes, or study material

          </p>

        </div>
        {errors.file && (
            <p className="text-red-500 text-sm mt-4">
                {errors.file}
            </p>
        )}


        {/* DUE DATE */}
        <div className="mb-8">

          <label className="block mb-3 text-sm font-semibold text-gray-700 text-black placeholder:text-gray-500">

            Due Date

          </label>

          <div className="relative">

            <input
              type="date"
              value={dueDate}
              onChange={(e) =>
                {
                setDueDate(
                  e.target.value
                )
                setErrors(prev=>({
                    ...prev,
                    dueDate:"",
                }));

              }
              }
              className="w-full bg-[#f7f7f7] rounded-2xl px-5 py-4 outline-none border border-black/5 text-black placeholder:text-gray-500"
            />

            <CalendarDays
              size={20}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500"
            />

          </div>

        </div>
        {errors.dueDate && (
            <p className="text-red-500 text-sm mt-2">
                {errors.dueDate}
            </p>
        )}


        {/* QUESTION TYPES */}
<div>

  <h3 className="text-lg font-bold text-gray-900 mb-5">

    Question Type

  </h3>

  {/* ================= DESKTOP VIEW ================= */}
  <div className="hidden lg:block">

    {/* HEADER */}
    <div className="grid grid-cols-12 gap-4 mb-5 px-2">

      <h3 className="col-span-4 text-sm font-semibold text-gray-700">
        Question Type
      </h3>

      <h3 className="col-span-2 text-sm font-semibold text-gray-700 text-center">
        Difficulty
      </h3>

      <h3 className="col-span-2 text-sm font-semibold text-gray-700 text-center">
        Questions
      </h3>

      <h3 className="col-span-2 text-sm font-semibold text-gray-700 text-center">
        Marks
      </h3>

      <h3 className="col-span-2 text-sm font-semibold text-gray-700 text-center">
        Remove
      </h3>

    </div>

    {/* ROWS */}
    <div className="space-y-4">

      {
        questionTypes.map(
          (item, index) => (

            <div
              key={index}
              className="grid grid-cols-12 gap-4 items-center"
            >

              {/* TYPE */}
              <div className="col-span-4">

                <select
                  value={item.type}
                  onChange={(e) => {

                    const updated =
                      [...questionTypes];

                    updated[index].type =
                      e.target.value;

                    setQuestionTypes(updated);

                  }}
                  className="w-full bg-[#f7f7f7] rounded-2xl px-5 py-4 outline-none border border-black/5 text-sm font-medium text-gray-700"
                >

                  {
                    QUESTION_TYPE_OPTIONS.map(
                      (option) => (

                        <option
                          key={option}
                          value={option}
                        >

                          {option}

                        </option>

                      )
                    )
                  }

                </select>

              </div>

              {/* DIFFICULTY */}
              <div className="col-span-2">

                <select
                  value={item.difficulty}
                  onChange={(e) => {

                    const updated =
                      [...questionTypes];

                    updated[index].difficulty =
                      e.target.value;

                    setQuestionTypes(updated);

                  }}
                  className="w-full rounded-2xl px-4 py-4 outline-none border border-black/5 text-sm  bg-[#f7f7f7]"
                >

                  <option value="easy">
                    Easy
                  </option>

                  <option value="medium">
                    Medium
                  </option>

                  <option value="hard">
                    Hard
                  </option>

                </select>

              </div>

              {/* QUESTIONS */}
              <div className="col-span-2">

                <div className="bg-[#f7f7f7] rounded-2xl px-4 py-3 flex items-center justify-between">

                  <button
                    onClick={() =>
                      updateQuestions(
                        index,
                        "dec"
                      )
                    }
                  >

                    <Minus
                      size={16}
                      className="text-gray-500"
                    />

                  </button>

                  <span className="font-semibold">

                    {item.questions}

                  </span>

                  <button
                    onClick={() =>
                      updateQuestions(
                        index,
                        "inc"
                      )
                    }
                  >

                    <Plus
                      size={16}
                      className="text-gray-500"
                    />

                  </button>

                </div>

              </div>

              {/* MARKS */}
              <div className="col-span-2">

                <div className="bg-[#f7f7f7] rounded-2xl px-4 py-3 flex items-center justify-between">

                  <button
                    onClick={() =>
                      updateMarks(
                        index,
                        "dec"
                      )
                    }
                  >

                    <Minus
                      size={16}
                      className="text-gray-500"
                    />

                  </button>

                  <span className="font-semibold">

                    {item.marks}

                  </span>

                  <button
                    onClick={() =>
                      updateMarks(
                        index,
                        "inc"
                      )
                    }
                  >

                    <Plus
                      size={16}
                      className="text-gray-500"
                    />

                  </button>

                </div>

              </div>

              {/* REMOVE */}
              <div className="col-span-2 flex justify-center">

                <button
                  onClick={() =>
                    removeQuestionType(index)
                  }
                  className="w-11 h-11 rounded-xl bg-red-50 hover:bg-red-100 transition flex items-center justify-center"
                >

                  <X
                    size={18}
                    className="text-red-500"
                  />

                </button>

              </div>

            </div>

          )
        )
      }

    </div>

  </div>

  {/* ================= MOBILE VIEW ================= */}
  <div className="block lg:hidden space-y-4">

    {
      questionTypes.map(
        (item, index) => (

          <div
            key={index}
            className="bg-[#f7f7f7] rounded-3xl p-4 border border-black/5"
          >

            {/* TOP */}
            <div className="flex items-center gap-3 mb-4">

              <select
                value={item.type}
                onChange={(e) => {

                  const updated =
                    [...questionTypes];

                  updated[index].type =
                    e.target.value;

                  setQuestionTypes(updated);

                }}
                className="flex-1 bg-white rounded-xl px-4 py-3 outline-none border border-black/5 text-sm font-medium"
              >

                {
                  QUESTION_TYPE_OPTIONS.map(
                    (option) => (

                      <option
                        key={option}
                        value={option}
                      >

                        {option}

                      </option>

                    )
                  )
                }

              </select>

              <button
                onClick={() =>
                  removeQuestionType(index)
                }
                className="w-10 h-10 rounded-xl bg-white border border-black/5 flex items-center justify-center"
              >

                <X
                  size={18}
                  className="text-gray-500"
                />

              </button>

            </div>

            {/* DIFFICULTY */}
            <div className="mb-4">

              <p className="text-xs font-semibold text-gray-500 mb-2">

                Difficulty

              </p>

              <select
                value={item.difficulty}
                onChange={(e) => {

                  const updated =
                    [...questionTypes];

                  updated[index].difficulty =
                    e.target.value;

                  setQuestionTypes(updated);

                }}
                className="w-full bg-white rounded-xl px-4 py-3 outline-none border border-black/5 text-sm text-black placeholder:text-gray-500"
              >

                <option value="easy">
                  Easy
                </option>

                <option value="medium">
                  Medium
                </option>

                <option value="hard">
                  Hard
                </option>

              </select>

            </div>

            {/* QUESTIONS + MARKS */}
            <div className="grid grid-cols-2 gap-3">

              {/* QUESTIONS */}
              <div>

                <p className="text-xs font-semibold text-gray-500 mb-2 text-black placeholder:text-gray-500">

                  No. of Questions

                </p>

                <div className="bg-white rounded-xl px-3 py-3 flex items-center justify-between border border-black/5">

                  <button
                    onClick={() =>
                      updateQuestions(
                        index,
                        "dec"
                      )
                    }
                  >

                    <Minus
                      size={16}
                      className="text-gray-500"
                    />

                  </button>

                  <span className="font-semibold text-sm">

                    {item.questions}

                  </span>

                  <button
                    onClick={() =>
                      updateQuestions(
                        index,
                        "inc"
                      )
                    }
                  >

                    <Plus
                      size={16}
                      className="text-gray-500"
                    />

                  </button>

                </div>

              </div>

              {/* MARKS */}
              <div>

                <p className="text-xs font-semibold text-gray-500 mb-2 text-black placeholder:text-gray-500">

                  Marks

                </p>

                <div className="bg-white rounded-xl px-3 py-3 flex items-center justify-between border border-black/5">

                  <button
                    onClick={() =>
                      updateMarks(
                        index,
                        "dec"
                      )
                    }
                  >

                    <Minus
                      size={16}
                      className="text-gray-500"
                    />

                  </button>

                  <span className="font-semibold text-sm">

                    {item.marks}

                  </span>

                  <button
                    onClick={() =>
                      updateMarks(
                        index,
                        "inc"
                      )
                    }
                  >

                    <Plus
                      size={16}
                      className="text-gray-500"
                    />

                  </button>

                </div>

              </div>

            </div>

          </div>

        )
      )
    }

  </div>

  {/* ADD BUTTON */}
  <button
    onClick={addQuestionType}
    className="mt-6 flex items-center gap-3 text-sm font-semibold text-gray-700 hover:text-black transition"
  >

    <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center">

      <Plus size={18} />

    </div>

    Add Question Type

  </button>

  {/* TOTALS */}
  <div className="mt-8 flex flex-col items-end gap-2 text-gray-700">

    <p className="font-medium text-sm lg:text-base">

      Total Questions :

      <span className="font-bold ml-2">

        {totalQuestions}

      </span>

    </p>

    <p className="font-medium text-sm lg:text-base">

      Total Marks :

      <span className="font-bold ml-2">

        {totalMarks}

      </span>

    </p>

  </div>

</div>


        {/* ADDITIONAL INFO */}
        <div className="mt-10">

          <label className="block mb-3 text-sm font-semibold text-gray-700">

            Additional Instructions

          </label>

          <div className="relative">

            <textarea
              rows={5}
              value={instructions}
              onChange={(e) =>
                setInstructions(
                  e.target.value
                )
              }
              placeholder="Enter syllabus/content for AI generation..."
              className="w-full bg-[#f7f7f7] rounded-3xl p-6 outline-none resize-none border border-black/5 text-black placeholder:text-gray-500"
            />

            <button className="absolute bottom-5 right-5 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">

              <Mic size={18} />

            </button>

          </div>

        </div>

      </div>


      {/* FOOTER BUTTONS */}
      <div className="flex items-center justify-between mt-8">

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-2 bg-black text-white px-7 py-4 rounded-full shadow-xl font-medium hover:scale-105 transition"
        >

          {
            loading
              ? "Generating..."
              : "Generate Assignment"
          }

          <ArrowRight size={18} />

        </button>

      </div>

    </div>

  );
};

export default GenerateAssignmentPage;