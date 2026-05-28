"use client";

import useAssignmentStore
from "../../../store/assignmentStore";

import { useRef }
from "react";

import html2canvas
from "html2canvas";

import { jsPDF }
from "jspdf";

export default function QuestionPaperPage() {

  const {

    generatedPaper,

    selectedAssignment,

  } = useAssignmentStore();

  const paperRef =
    useRef(null);

  // ================= EMPTY =================

  if (!generatedPaper) {

    return (

      <div className="p-10 lg:p-20 text-center">

        <h1 className="text-2xl lg:text-3xl font-bold text-black">

          No Question Paper Found

        </h1>

      </div>

    );

  }

  // ================= TOTAL MARKS =================

  const totalMarks =
    generatedPaper.sections.reduce(

      (sectionTotal, section) =>

        sectionTotal +

        section.questions.reduce(

          (questionTotal, question) =>

            questionTotal +
            question.marks,

          0

        ),

      0

    );

  // ================= DOWNLOAD PDF =================

  const downloadPDF =
    async () => {

      if (!paperRef.current)
        return;

      const canvas =
        await html2canvas(
          paperRef.current,
          {
            scale: 2,
            useCORS: true,
            backgroundColor:
              "#ffffff",
          }
        );

      const imgData =
        canvas.toDataURL(
          "image/png"
        );

      const pdf =
        new jsPDF({
          orientation:
            "portrait",
          unit: "mm",
          format: "a4",
        });

      const pdfWidth =
        pdf.internal.pageSize.getWidth();

      const pdfHeight =
        (canvas.height *
          pdfWidth) /
        canvas.width;

      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdfWidth,
        pdfHeight
      );

      pdf.save(
        "question-paper.pdf"
      );

    };

  return (

    <div className="space-y-4 lg:space-y-6 px-3 lg:px-0 pb-10">

      {/* ================= TOP BANNER ================= */}

      <div className="bg-[#1f1f1f] rounded-[24px] lg:rounded-[32px] p-4 lg:p-8 text-white shadow-2xl">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          {/* LEFT */}
          <div>

            <h1 className="text-2xl lg:text-4xl font-bold text-white leading-tight">

              {
                selectedAssignment?.institution ||

                "VedaAI Assessment System"
              }

            </h1>

            <p className="text-sm lg:text-2xl font-semibold leading-relaxed mt-3 max-w-3xl">

              Carefully designed AI generated
              question paper for your class.

            </p>

          </div>

          {/* BUTTON */}
          <button
            onClick={downloadPDF}
            className="bg-white text-black px-5 py-3 lg:px-6 lg:py-3 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:scale-105 transition-all duration-300 shadow-lg w-full lg:w-fit text-sm lg:text-base"
          >

            📄 Download PDF

          </button>

        </div>

      </div>

      {/* ================= QUESTION PAPER ================= */}

      <div
        ref={paperRef}
        className="bg-white rounded-[28px] lg:rounded-[36px] shadow-xl border border-gray-200 p-5 lg:p-16 max-w-5xl mx-auto"
      >

        {/* ================= SCHOOL DETAILS ================= */}

        <div className="text-center">

          <h1 className="text-2xl lg:text-4xl font-bold text-black leading-tight">

            {
              selectedAssignment?.institution ||

              "VedaAI Assessment System"
            }

          </h1>

          <p className="text-lg lg:text-2xl mt-4 font-medium text-black">

            Subject:
            {" "}
            {
              selectedAssignment?.subject
            }

          </p>

        </div>

        {/* ================= PAPER INFO ================= */}

        <div className="flex flex-col lg:flex-row lg:justify-between gap-3 mt-10 lg:mt-14 text-black font-medium text-sm lg:text-base">

          <p>

            Due Date:
            {" "}

            {
              selectedAssignment?.dueDate

                ? new Date(
                    selectedAssignment.dueDate
                  ).toLocaleDateString()

                : "N/A"
            }

          </p>

          <p>

            Maximum Marks:
            {" "}
            {totalMarks}

          </p>

        </div>

        {/* ================= INSTRUCTION ================= */}

        <p className="mt-6 lg:mt-8 text-black text-sm lg:text-lg leading-relaxed">

          All questions are compulsory unless stated otherwise.

        </p>

        {/* ================= STUDENT DETAILS ================= */}

        <div className="mt-8 lg:mt-10 space-y-3 text-gray-800 text-sm lg:text-base">

          <p>

            Name:
            {" "}
            __________________

          </p>

          <p>

            Roll Number:
            {" "}
            ___________

          </p>

          <p>

            Class:
            {" "}
            ___________

            {" "}

            Section:
            {" "}
            ______

          </p>

        </div>

        {/* ================= SECTIONS ================= */}

        {
          generatedPaper.sections.map(

            (
              section,
              sectionIndex
            ) => (

              <div
                key={sectionIndex}
                className="mt-12 lg:mt-16"
              >

                {/* SECTION TITLE */}

                <div className="text-center">

                  <h2 className="text-2xl lg:text-3xl font-bold text-black">

                    Section
                    {" "}

                    {
                      String.fromCharCode(
                        65 + sectionIndex
                      )
                    }

                  </h2>

                </div>

                {/* SECTION INFO */}

                <div className="mt-8 lg:mt-10">

                  <h3 className="text-lg lg:text-xl font-semibold text-black">

                    {section.title}

                  </h3>

                  <p className="italic text-black mt-2 text-sm lg:text-base leading-relaxed">

                    {section.instruction}

                  </p>

                </div>

                {/* QUESTIONS */}

                <div className="mt-8 lg:mt-10 space-y-6 lg:space-y-8">

                  {
                    section.questions.map(

                      (
                        question,
                        questionIndex
                      ) => (

                        <div
                          key={questionIndex}
                          className="flex items-start gap-3 lg:gap-4"
                        >

                          {/* NUMBER */}

                          <p className="font-medium text-black text-sm lg:text-base">

                            {
                              questionIndex + 1
                            }.

                          </p>

                          {/* QUESTION */}

                          <div className="flex-1">

                            <p className="text-gray-800 leading-relaxed whitespace-pre-line text-sm lg:text-base">


                              {" "}

                              {
                                question.questionText
                              }

                              {/* MARKS */}

                              <span className="font-semibold text-black">

                                {" "}

                                [

                                {
                                  question.marks
                                }

                                {" "}

                                Marks]

                              </span>

                            </p>

                          </div>

                        </div>

                      )

                    )
                  }

                </div>

              </div>

            )

          )
        }

        {/* ================= END ================= */}

        <div className="mt-10 lg:mt-12">

          <p className="font-semibold text-gray-800 text-sm lg:text-base">

            End of Question Paper

          </p>

        </div>

      </div>

    </div>

  );

}